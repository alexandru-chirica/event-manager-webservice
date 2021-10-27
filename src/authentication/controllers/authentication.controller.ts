import {
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import * as uuid4 from 'uuid4';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDataDto } from '../dtos/user-data.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ExtractFormDataPipe } from '../pipes/extract-form-data.pipe';
import { FilterFormDataPipe } from '../pipes/filter-form-data.pipe';
import { ParseJSONFormDataPipe } from '../pipes/parse-json-form-data.pipe';
import { AuthenticationService } from '../services/authentication.service';
import { FileService } from '../../shared/services/file.service';

@Controller('auth')
export class AuthenticationController {
  // --- Constructor ---

  constructor(
    private authenticationService: AuthenticationService,
    private fileService: FileService,
  ) {}

  // --- Endpoints ---

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserDataDto })
  @ApiResponse({
    description: 'Returns the access token.',
    status: 200,
    type: String,
  })
  @UsePipes(new ValidationPipe())
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  /**
   * This endpoint has been one endless big hacky way to extract the data without making 2 calls ... which might've been a better option?
   */
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201 })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'document', maxCount: 1 },
    ]),
  )
  @UsePipes(
    new ParseJSONFormDataPipe({
      fields: [{ name: 'document', newName: 'createUserDto' }],
    }),
  )
  async register(
    @UploadedFiles(
      new FilterFormDataPipe({ fields: ['createUserDto'] }),
      new ExtractFormDataPipe(),
      new ValidationPipe({ expectedType: CreateUserDto }),
    )
    createUserDto: CreateUserDto,
    @UploadedFiles(new FilterFormDataPipe({ fields: ['avatar'] }))
    files: { avatar: Array<Express.Multer.File> },
  ) {
    const avatar = files.avatar[0];
    const { buffer, originalname } = avatar;
    const fileExtension = originalname.split('.').pop();
    const id = uuid4();
    const path = `${id}.${fileExtension}`;

    await this.fileService.write(buffer, path);
    await this.authenticationService.register({
      ...createUserDto,
      avatar: {
        filename: originalname,
        url: path,
      },
    });
  }
}

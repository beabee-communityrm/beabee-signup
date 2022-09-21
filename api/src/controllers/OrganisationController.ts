import { IsEmail, IsIn, IsString, Matches } from 'class-validator';
import { fromBuffer, MimeType } from 'file-type';
import fs from 'fs';
import {
  BadRequestError,
  BodyParam,
  JsonController,
  OnUndefined,
  Post,
  UploadedFile,
} from 'routing-controllers';
import { getRepository } from 'typeorm';

import { generatePassword } from '@core/utils/auth';

import Organisation from '@models/Organisation';

const availableLocales = ['en', 'de', 'de@informal'];
const validImages: MimeType[] = ['image/png', 'image/jpeg'];

class CreateOrganisationData {
  @Matches(/^[a-z0-9-]+$/)
  id!: string;

  @IsString()
  organisationName!: string;

  @IsString()
  addressLine1!: string;

  @IsString()
  addressLine2!: string;

  @IsString()
  cityOrTown!: string;

  @IsString()
  postcode!: string;

  @IsString()
  country!: string;

  @IsIn(availableLocales)
  locale!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@JsonController('/organisation')
export class OrganisationController {
  @Post()
  @OnUndefined(201)
  async addOrganisation(
    @UploadedFile('logo') logo: Express.Multer.File,
    @BodyParam('data') data: CreateOrganisationData
  ) {
    const type = await fromBuffer(logo.buffer);
    if (!type || !validImages.includes(type.mime)) {
      throw new BadRequestError('Invalid logo MIME type ' + type?.mime);
    }

    const org = getRepository(Organisation).create({
      id: data.id,
      name: data.organisationName,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.cityOrTown,
      postcode: data.postcode,
      country: data.country,
      locale: data.locale,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: await generatePassword(data.password),
    });
    await getRepository(Organisation).save(org);

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(
        `uploads/logos/${org.id}.${type.ext}`,
        logo.buffer,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

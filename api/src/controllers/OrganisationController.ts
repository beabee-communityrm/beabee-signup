import Organisation from '@models/Organisation';
import { IsEmail, IsIn, IsString } from 'class-validator';
import {
  BodyParam,
  JsonController,
  Post,
  UploadedFile,
} from 'routing-controllers';
import { generatePassword } from '@core/utils/auth';
import { getRepository } from 'typeorm';

const availableLocales = ['en', 'de', 'de@informal'];

class CreateOrganisationData {
  @IsString()
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
  async addOrganisation(
    @UploadedFile('logo') logo: Express.Multer.File,
    @BodyParam('data') data: CreateOrganisationData
  ) {
    console.log(logo);
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
    const theOrg = await getRepository(Organisation).save(org);
    return theOrg;
  }
}

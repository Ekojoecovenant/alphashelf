import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../modules/users/users.service';
import { Role } from '../../modules/auth/enums/role.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersSservice = app.get(UsersService);

  const email = 'covenantekojoe@gmail.com';
  const password = 'securepassword';

  const existingAdmin = await usersSservice.findByEmail(email);

  if (existingAdmin) {
    console.log('Admin already exists');
    await app.close();
    return;
  }

  await usersSservice.create({
    email,
    passwordHash: password,
    role: Role.ADMIN,
  });

  console.log('Admin user created successfully');

  await app.close();
}

void bootstrap();

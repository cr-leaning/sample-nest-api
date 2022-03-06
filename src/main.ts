import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalEnvService } from './config/service/env.global.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(GlobalEnvService);

  if (env.NodeEnv !== 'prodcution') {
    const config = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription('coding test')
      .setVersion(process.env.npm_package_version)
      .addServer('http://localhost:3000', 'local', {})
      .addTag('order')
      .build();
    const document = SwaggerModule.createDocument(app, config, {});
    if (env.NodeEnv === 'local') {
      // local限定なので動的にimport、、、これって効果が有るのかな？？
      const yaml = await import('js-yaml');
      const yDoc = yaml.dump(document, {
        lineWidth: -1, // saggerのyamlファイルの横幅は無制限
      });
      const fs = await import('fs');
      // TODO: ファイル名は環境変数化
      fs.writeFileSync('./openapi/openapi.yaml', yDoc);
    }
    SwaggerModule.setup('openapi', app, document);
  }

  await app.listen(env.Port);
  const logger = new Logger();
  logger.log(`Applicaiton is running on: ${await app.getUrl()}`);

  app.enableShutdownHooks();
}
bootstrap();

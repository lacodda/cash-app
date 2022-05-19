import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const user = configService.get('MONGO_USER');
  const pass = configService.get('MONGO_PASSWORD');
  const host = configService.get('MONGO_HOST');
  const port = configService.get('MONGO_PORT');
  const db = configService.get('MONGO_DATABASE');
  let credentials = '';
  if (user && pass) {
    credentials = `${user}:${pass}@`;
  }

  return {
    uri: `mongodb://${credentials}${host}:${port}/${db}?retryWrites=true&w=majority`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};

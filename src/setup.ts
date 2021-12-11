import dotenv from 'dotenv';

const path = process.env.NODE_ENV === 'test' ? '.env.local' : '.env';

dotenv.config({
  path,
});

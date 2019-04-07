import {expectType} from 'tsd';
import binVersion = require('.');

expectType<Promise<string>>(binVersion('curl'));
expectType<Promise<string>>(binVersion('openssl', {args: ['version']}));

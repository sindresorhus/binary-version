import {expectType} from 'tsd';
import binaryVersion from './index.js';

expectType<Promise<string>>(binaryVersion('curl'));
expectType<Promise<string>>(binaryVersion('openssl', {args: ['version']}));

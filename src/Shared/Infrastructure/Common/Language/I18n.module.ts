import { Module } from '@nestjs/common';
import { I18nModule as I18n, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
    imports: [
        I18n.forRoot({
            fallbackLanguage: 'es',
            loaderOptions: {
                path: path.join(process.cwd(), 'src/Shared/Infrastructure/Common/Language/I18n'),
                watch: true,
            },

            resolvers: [{ use: QueryResolver, options: ['lang'] }],
        }),
    ],
    exports: [I18n],
})
export class I18nModule { }
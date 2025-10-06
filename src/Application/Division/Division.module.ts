import { Delete, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreDivisionUseCase } from './Application/Post/StoreDivision.useCase';
import { DivisionService } from './Infrastructure/Services/Division.service';
import { DivisionRepository } from './Infrastructure/Repositories/Division.repository';
import { StoreDivisionController } from './Infrastructure/Controllers/StoreDivision.controller';
import { Division } from 'src/Shared/Domain/Entities/Division.entity';
import { UpdateDivisionController } from './Infrastructure/Controllers/UpdateDivision.controller';
import { ShowDivisionController } from './Infrastructure/Controllers/ShowDivision.controller';
import { ListSubDivisionController } from './Infrastructure/Controllers/ListSubDivision.controller';
import { DeleteDivisionController } from './Infrastructure/Controllers/DeleteDivision.controller';
import { ListAllDivisionController } from './Infrastructure/Controllers/ListAllDivision.controller';
import { UpdateDivisionUseCase } from './Application/Put/UpdateDivision.useCase';
import { ListSubDivisionUseCase } from './Application/Get/ListSubDivision.useCase';
import { ListAllDivisionUseCase } from './Application/Get/ListAllDivision.useCase';
import { ShowDivisionUseCase } from './Application/Get/ShowDivision.useCase';
import { DeleteDivisionUseCase } from './Application/Delete/DeleteDivision.useCase';
import { I18nModule } from 'src/Shared/Infrastructure/Common/Language/I18n.module';

@Module({
    imports: [TypeOrmModule.forFeature([Division]), I18nModule],
    controllers: [StoreDivisionController, UpdateDivisionController, ShowDivisionController, DeleteDivisionController, ListAllDivisionController, ListSubDivisionController],
    providers: [DivisionRepository, DivisionService, StoreDivisionUseCase, UpdateDivisionUseCase, DeleteDivisionUseCase, ShowDivisionUseCase, ListAllDivisionUseCase, ListSubDivisionUseCase],
})
export class DivisionModule { }

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreDivisionDto } from '../../Infrastructure/Dto/StoreDivision.dto';
import { Division } from 'src/Shared/Domain/Entities/Division.entity';
import { messageI18n } from 'src/Shared/Infrastructure/Common/Helper/I18n.helper';
import { I18nService } from 'nestjs-i18n';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DivisionRepository {
    constructor(
        @InjectRepository(Division)
        private readonly divisionRepository: Repository<Division>,
        private readonly i18n: I18nService,
    ) { }


    async create(storeDivisionDto: StoreDivisionDto): Promise<Division> {
        const division = this.divisionRepository.create({
            name: storeDivisionDto.name,
            level: storeDivisionDto.level,
            collaborators: storeDivisionDto.collaborators,
            ambassador: storeDivisionDto.ambassador,
        });

        if (storeDivisionDto.parentDivisionId) {
            division.parentDivision = { id: storeDivisionDto.parentDivisionId } as Division;
        }

        return this.divisionRepository.save(division);
    }

    async findOneById(id: number): Promise<Division | null> {
        return this.divisionRepository.findOneBy({ id, isActive: true });
    }

    async update(id: number, updateData: Partial<Division>): Promise<Division> {
        await this.divisionRepository.update(id, updateData);
        const updated = await this.findOneById(id);
        if (!updated) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }
        return updated;
    }

    async findOneWithRelations(id: number, relations: string[] = []): Promise<Division | null> {
        return this.divisionRepository.findOne({ where: { id }, relations });
    }

    async save(division: Division): Promise<Division> {
        return this.divisionRepository.save(division);
    }

    async delete(id: number): Promise<void> {
        const division = await this.divisionRepository.findOneBy({ id });
        if (!division) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }

        division.isActive = false;
        await this.divisionRepository.save(division);
    }


    async findOne(id: number): Promise<Division | null> {
        return this.divisionRepository.findOne({
            where: { id, isActive: true },
            relations: ['parentDivision', 'subdivisions'],
        });
    }

    async findAndCount(options: any): Promise<[Division[], number]> {
        return this.divisionRepository.findAndCount(options);
    }

    async findSubdivisionsByParentId(parentId: number): Promise<Division[]> {
        return await this.divisionRepository.find({
            where: {
                parentDivision: { id: parentId },
                isActive: true
            },
            relations: ['parentDivision'],
            order: { id: 'ASC' },
        });
    }
}

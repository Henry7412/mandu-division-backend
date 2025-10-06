import { Injectable, NotFoundException } from "@nestjs/common";
import { StoreDivisionDto } from "../Dto/StoreDivision.dto";
import { DivisionRepository } from "../Repositories/Division.repository";
import { UpdateDivisionDto } from "../Dto/UpdateDivision.dto";
import { DivisionIdDto } from "../Dto/DivisionId.dto";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { messageI18n } from "src/Shared/Infrastructure/Common/Helper/I18n.helper";
import { PaginationListDto } from "../Dto/PaginationList.dto";
import { Division } from "src/Shared/Domain/Entities/Division.entity";

@Injectable()
export class DivisionService {
    constructor(private readonly divisionRepository: DivisionRepository, private readonly i18n: I18nService) { }

    async create(storeDivisionDto: StoreDivisionDto): Promise<any> {
        return await this.divisionRepository.create(storeDivisionDto);
    }

    async updateDivision(
        divisionIdDto: DivisionIdDto,
        updateDivisionDto: UpdateDivisionDto,
    ): Promise<Division> {
        const { id } = divisionIdDto;

        const existingDivision = await this.divisionRepository.findOneWithRelations(id, ['parentDivision']);
        if (!existingDivision) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }

        if (updateDivisionDto.parentDivision) {
            const parent = await this.divisionRepository.findOneById(updateDivisionDto.parentDivision);
            if (!parent) {
                throw new NotFoundException('División padre no encontrada');
            }

            existingDivision.parentDivision = parent;
        }

        Object.assign(existingDivision, updateDivisionDto);
        return this.divisionRepository.save(existingDivision);
    }

    async deleteDivision(divisionIdDto: DivisionIdDto): Promise<any> {
        const { id } = divisionIdDto;
        const division = await this.divisionRepository.findOneById(id);

        if (!division || !division.isActive) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }

        division.isActive = false;
        await this.divisionRepository.save(division);

        return { id };
    }


    async showDivision(divisionIdDto: DivisionIdDto): Promise<any> {
        const { id } = divisionIdDto;

        const division = await this.divisionRepository.findOne(id);

        if (!division) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }

        const items = {
            id: division.id,
            name: division.name,
            level: division.level,
            collaborators: division.collaborators,
            ambassador: division.ambassador,
            parentDivision: division.parentDivision?.name || null,
            subdivisionsCount: division.subdivisions?.filter(s => s.isActive)?.length || 0,
        };

        return { data: { items } };
    }

    async listAllDivisions(paginationListDto: PaginationListDto): Promise<any> {
        const { page, pageSize } = paginationListDto;

        const [divisions, total] = await this.divisionRepository.findAndCount({
            where: { isActive: true },
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: ['parentDivision', 'subdivisions'],
            order: { id: 'ASC' },
        });

        const items = divisions.map((division) => ({
            id: division.id,
            name: division.name,
            level: division.level,
            collaborators: division.collaborators,
            ambassador: division.ambassador,
            parentDivision: division.parentDivision?.name || null,
            subdivisionsCount: division.subdivisions?.filter(s => s.isActive)?.length || 0,
        }));

        return {
            data: {
                items,
                pagination: {
                    page,
                    pageSize,
                    total,
                },
            },
        };
    }

    async listSubDivisions(divisionIdDto: DivisionIdDto): Promise<any> {
        const { id } = divisionIdDto;

        const parentDivision = await this.divisionRepository.findOneById(id);
        if (!parentDivision) {
            throw new NotFoundException(messageI18n(this.i18n, 'validation.not_found'));
        }

        const subdivisions = await this.divisionRepository.findSubdivisionsByParentId(id);

        const items = subdivisions.map((subdivision) => ({
            id: subdivision.id,
            name: subdivision.name,
            level: subdivision.level,
            collaborators: subdivision.collaborators,
            ambassador: subdivision.ambassador,
            parentDivision: subdivision.parentDivision?.name || null,
        }));

        return {
            data: {
                items,
            },
        };
    }


}

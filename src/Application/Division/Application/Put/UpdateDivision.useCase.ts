import { Injectable } from "@nestjs/common";
import { DivisionService } from "../../Infrastructure/Services/Division.service";
import { UpdateDivisionDto } from "../../Infrastructure/Dto/UpdateDivision.dto";
import { DivisionIdDto } from "../../Infrastructure/Dto/DivisionId.dto";

@Injectable()
export class UpdateDivisionUseCase {
    constructor(private readonly divisionService: DivisionService) { }

    async __invoke(divisionIdDto: DivisionIdDto, updateDivisionDto: UpdateDivisionDto): Promise<any> {
        return this.divisionService.updateDivision(divisionIdDto, updateDivisionDto);
    }
}
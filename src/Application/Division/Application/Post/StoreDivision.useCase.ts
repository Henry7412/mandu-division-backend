import { Injectable } from "@nestjs/common";
import { DivisionService } from "../../Infrastructure/Services/Division.service";
import { StoreDivisionDto } from "../../Infrastructure/Dto/StoreDivision.dto";

@Injectable()
export class StoreDivisionUseCase {
    constructor(private readonly divisionService: DivisionService) { }

    async __invoke(storeDivisionDto: StoreDivisionDto): Promise<any> {
        return await this.divisionService.create(storeDivisionDto);
    }
}

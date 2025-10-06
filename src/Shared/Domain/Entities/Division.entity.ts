import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('divisions')
export class Division {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 45 })
    name: string;

    @ManyToOne(() => Division, (division) => division.subdivisions, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    parentDivision: Division;


    @OneToMany(() => Division, (division) => division.parentDivision)
    subdivisions: Division[];

    @Column({ type: 'int', unsigned: true })
    level: number;

    @Column({ type: 'int', unsigned: true })
    collaborators: number;

    @Column({ nullable: true })
    ambassador: string;

    @Column({ default: true })
    isActive: boolean;

}
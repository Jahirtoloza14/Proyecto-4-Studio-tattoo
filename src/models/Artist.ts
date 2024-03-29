import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany,OneToOne,JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Service } from "./Service";
import { User } from "./User";

@Entity("artists")
export class Artist extends BaseEntity {
   
   
    
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ name: "first_name"})
    firstName!: string
    
    @Column({ name: "last_name" })
    lastName!: string;

    @Column({ name: "porfolio" })
    portfolio?: string;

    @OneToMany(() => Service, (design) => design)
  service!: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  clientAppointments!: Appointment[];

  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;
   
  
}

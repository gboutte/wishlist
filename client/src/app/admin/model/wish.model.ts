import { serializable } from 'serializr';
import { date } from '../../global/date-serializable';


export class Wish {
  @serializable
  id!: string;

  @serializable
  title!: string;

  @serializable
  link!: string;

  @serializable
  description!: string;
  @serializable
  picture!: string;

  @serializable
  price!: number;

  @serializable
  order!: number;

  @serializable
  disabled!: boolean;

  @serializable(date)
  public created_at!: Date;

  @serializable(date)
  public updated_at!: Date;
}

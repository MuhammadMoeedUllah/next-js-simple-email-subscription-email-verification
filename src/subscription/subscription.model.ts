import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

@Table
export class Subscriptions extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Index
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  active: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  frequency: boolean;

  @Column({ defaultValue: false, allowNull: false })
  emailVerified: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;
}

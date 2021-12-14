import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodbDB') dataSource: MongodbDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Pedido, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}

import { makeUpdateOrderUseCase } from '@/main/factories/domain/use-cases/order'
import { UpdateOrderController } from '@/application/controllers/order'

export const makeUpdateOrderController = (): UpdateOrderController => {
  return new UpdateOrderController(makeUpdateOrderUseCase())
}

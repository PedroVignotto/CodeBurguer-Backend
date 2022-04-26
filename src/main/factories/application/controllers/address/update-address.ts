import { makeUpdateAddressUseCase } from '@/main/factories/domain/use-cases/address'
import { UpdateAddressController } from '@/application/controllers/address'

export const makeUpdateAddressController = (): UpdateAddressController => {
  return new UpdateAddressController(makeUpdateAddressUseCase())
}

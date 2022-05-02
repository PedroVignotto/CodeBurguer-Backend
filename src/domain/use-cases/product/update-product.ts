import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByIdRepository, CheckProductByNameRepository, LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (
  productRepository: CheckProductByIdRepository & CheckProductByNameRepository & LoadProductRepository,
  categoryRepository: CheckCategoryByIdRepository
) => UpdateProduct
type Input = { id: string, name?: string, categoryId?: string, file?: { buffer: Buffer, mimeType: string } }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository, categoryRepository) => async ({ id, name, categoryId, file }) => {
  const productNotExists = await productRepository.checkById({ id })

  if (!productNotExists) return new NonExistentFieldError('id')

  if (name) {
    const productExists = await productRepository.checkByName({ name })

    if (productExists) return new FieldInUseError('name')
  }

  if (categoryId) {
    const categoryExists = await categoryRepository.checkById({ id: categoryId })

    if (!categoryExists) return new NonExistentFieldError('categoryId')
  }

  if (file) {
    await productRepository.load({ id })
  }
}

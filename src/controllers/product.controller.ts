import { Request, Response} from 'express'
import AppDataSource from '../connection'
import { Product } from '../entities/product.entity'
import { Repository } from 'typeorm'
import { error } from 'console'


class ProductController {
  private productRepository : Repository<Product>
  constructor(){
    this.productRepository = AppDataSource.getRepository(Product)
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)

    const products = await productRepository.find()



    return response.status(200).send({
      data: products
    })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name , description, weight} = request.body

    const product = new Product
    product.name = name
    product.weight= weight
    product.description = description

    const productRepository = AppDataSource.getRepository(Product)

    const productDb = await productRepository.save(product)

    return response.status(201).send({
      data: productDb
    })
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id


    const productRepository = AppDataSource.getRepository(Product)
    const product = await productRepository.findOneBy({ id })

    if (!product) {
      return response.status(404).send({
        error: 'Product not found'
      })
    }

    return response.status(200).send({
      data: product
    })

  }

  async update(request: Request, response: Response): Promise<Response>{
    const productRepository = AppDataSource.getRepository(Product)

    const id: string = request.params.id
    const { name , weight, description } = request.body

    try {
      let product = await productRepository.findOneByOrFail({ id })
      product.name = name
      product.description = description
      product.weight = weight

      const productDb = await productRepository.save(product)

      return response.status(200).send({
        data: productDb
      })
    } catch (error) {
      return response.status(404).send({
        error: 'Product Not Found'
      })
    }
  }
}

export default new ProductController

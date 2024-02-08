import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// Procura apenas um campo
// Tem o dto para que seja configurado  os campos obrigatórios ou não, e outros detalhes
export class UpdateProductDto extends PartialType(CreateProductDto) {}

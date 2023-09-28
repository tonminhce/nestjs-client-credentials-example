import { Injectable } from '@nestjs/common';
import { ShopManagementRepository } from './shop-management.repository';
import { CreateShopManagement } from './dto/create-shop-management.dto';
import { plainToClass } from 'class-transformer';
import { ShopManagementEntity } from './entities/shop-management.entity';

@Injectable()
export class ShopManagementService {
    constructor(private shopManagementRepository: ShopManagementRepository){}
    async create (createShopManagement: CreateShopManagement){
        const shopEntity = plainToClass(ShopManagementEntity, createShopManagement);
        return this.shopManagementRepository.create();
    }
}

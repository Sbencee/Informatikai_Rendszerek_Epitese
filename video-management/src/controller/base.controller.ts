import { Repository } from "typeorm";

export class Controller {
    
    repository: Repository<any>;
    create = async (req, res) => {
        const body = req.body;
        const entity = this.repository.create(body);
        try {
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch(err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    getAll = async (req, res) => {
        try {
            const entities =  await this.repository.find();
            res.json(entities);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    getOne = async (req, res) => {
        const entityId = parseInt(req.params.id);

        try {
            const entity = await this.repository.findOneById(entityId);

            if (!entity) {
                return res.status(404).json({ message: 'Entity not found.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update = async (req, res) => {
      const entityId = parseInt(req.params.id);
    
      try {
        const entity = await this.repository.findOneById(entityId);
    
        if (!entity) {
          return res.status(404).json({ message: 'Entity not found.' });
        }
    
        // Update the entity properties with the values from req.body
        this.repository.merge(entity, req.body);
    
        const modifiedEntity = await this.repository.save(entity);
        res.json(modifiedEntity);
      } catch (err) {
        let errorMessage = 'Failed to update entity.';
        if (err instanceof SomeSpecificError) {
          errorMessage = 'Specific error message for a certain condition.';
        } else if (err instanceof AnotherSpecificError) {
          errorMessage = 'Specific error message for another condition.';
        }
        res.status(500).json({
          message: errorMessage,
        });
      }
    };
    
      

    delete = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne(entityId);

            if(!entity) {
                return res.status(404).json({message: 'Not existing entity.'});
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

class SomeSpecificError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'EntityNotFoundError';
    }
  }
  
  class AnotherSpecificError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AnotherSpecificError';
    }
  }
import { getAllClientes, getCliente, createCliente, updateCliente, deleteCliente } from './ClienteController';
import { Cliente } from '../models/AllModels';

// Mock del modelo de Cliente
jest.mock('../models/AllModels', () => ({
  Cliente: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn()
  }
}));

describe('ClienteController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllClientes devuelve todos los clientes', async () => {
    const mockClientes = [{}, {}, {}];
    Cliente.find.mockResolvedValue(mockClientes);

    const mockReq = {
      query: {}
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllClientes(mockReq, mockRes);

    expect(Cliente.find).toHaveBeenCalledWith({});
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockClientes);
  });

  test('getCliente devuelve un cliente', async () => {
    const mockCliente = { _id: '1', empresa: 'Test' };
    Cliente.findById.mockResolvedValue(mockCliente);

    const mockReq = {
      params: {
        id: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getCliente(mockReq, mockRes);

    expect(Cliente.findById).toHaveBeenCalledWith({ _id: '1' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockCliente);
  });

  test('createCliente crea un cliente', async () => {
    const mockBody = { empresa: 'Test' };
    Cliente.create.mockResolvedValue(mockBody);

    const mockReq = {
      body: mockBody
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createCliente(mockReq, mockRes);

    expect(Cliente.create).toHaveBeenCalledWith(mockBody);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      "message":"¡Cliente creado correctamente"
    });
  });

  test('updateCliente actualiza un cliente', async () => {
    const mockBody = { empresa: 'Test actualizado' };
    Cliente.updateOne.mockResolvedValue({});

    const mockReq = {
      params: {
        id: '1'
      },
      body: mockBody
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateCliente(mockReq, mockRes);

    expect(Cliente.updateOne).toHaveBeenCalledWith({ _id: '1' }, mockBody);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      "message":"¡Cliente actualizado correctamente!"
    });
  });

  test('deleteCliente elimina un cliente', async () => {
    Cliente.deleteOne.mockResolvedValue({});

    const mockReq = {
      params: {
        id: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteCliente(mockReq, mockRes);

    expect(Cliente.deleteOne).toHaveBeenCalledWith({ _id: '1' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      "message":"¡Cliente eliminado correctamente!"
    });
  });
});

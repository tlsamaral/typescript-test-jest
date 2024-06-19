import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndividualCustomer = (firstName: string, lastName: string, cpf: string): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
}

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
}

describe('IndividualCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName, cpf', () => {
    // System under test
    const sut = createIndividualCustomer('Talles', 'Amaral', '123');
    expect(sut).toHaveProperty('firstName', 'Talles');
    expect(sut).toHaveProperty('lastName', 'Amaral');
    expect(sut).toHaveProperty('cpf', '123');
  })

  it('should have methods to get name and idn', () => {
    // System under test
    const sut = createIndividualCustomer('Talles', 'Amaral', '123');
    expect(sut.getName()).toBe('Talles Amaral');
    expect(sut.getIDN()).toBe('123')
  })
})

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have name and cnpj', () => {
    // System under test
    const sut = createEnterpriseCustomer('Udemy', '1234');
    expect(sut).toHaveProperty('name', 'Udemy');
    expect(sut).toHaveProperty('cnpj', '1234');
  })

  it('should have methods to get name and idn for enterprise customers', () => {
    // System under test
    const sut = createEnterpriseCustomer('Udemy', '1234');
    expect(sut.getName()).toBe('Udemy');
    expect(sut.getIDN()).toBe('1234')
  })
})

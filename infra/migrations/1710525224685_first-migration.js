/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  pgm.createSchema('nfe');
  pgm.createTable(
    { schema: 'nfe', name: 'contract'},
    {
      id_contract: {
        type: 'uuid',
        notNull: true,
        default: pgm.func('uuid_generate_v4()'),
        primaryKey: true
      },
      description: 'text',
      amount: 'numeric',
      periods: 'integer',
      date: 'timestamp'
    });
  pgm.createTable(
    { schema: 'nfe', name: 'payment'},
    {
      id_payment: {
        type: 'uuid',
        notNull: true,
        default: pgm.func('uuid_generate_v4()'),
        primaryKey: true
      },
      id_contract: {
        type: 'uuid',
        references: 'nfe.contract(id_contract)',
      },
      amount: 'numeric',
      date: 'timestamp'
    });

    pgm.sql(`
        INSERT INTO nfe.contract (id_contract, description, amount, periods, date) 
        VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pestação de serviços escolares', 6000, 12, '2024-01-01T00:00:00')
    `);
    
    pgm.sql(`
        INSERT INTO nfe.payment (id_payment, id_contract, amount, date) 
        VALUES ('55c61eb3-6536-429c-953a-a32a96ef4aee', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 6000, '2024-01-05T00:00:00')
    `);
};

exports.down = pgm => {
  pgm.sql(`
        DELETE FROM nfe.payment WHERE id_payment = '55c61eb3-6536-429c-953a-a32a96ef4aee'
    `);
  pgm.sql(`
        DELETE FROM nfe.contract WHERE id_contract = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    `);
  pgm.dropTable({ schema: 'nfe', name: 'payment'});
  pgm.dropTable({ schema: 'nfe', name: 'contract'});
  pgm.dropSchema('nfe');
  pgm.dropExtension('uuid-ossp');  
};

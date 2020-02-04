'use strict';

// Require the necessary things from Sequelize
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

// This function should be used instead of `new Sequelize()`.
// It applies the config for your SSCCE to work on CI.
const createSequelizeInstance = require('./utils/create-sequelize-instance');

// This is a utility logger that should be preferred over `console.log()`.
const log = require('./utils/log');

// Your SSCCE goes inside this function.
module.exports = async function() {
    const sequelize = createSequelizeInstance({
        logQueryParameters: true,
        benchmark: true,
        define: {
            timestamps: false // For less clutter in the SSCCE
        }
    });
  
    const Ofertadodia = sequelize.define('Ofertadodia', {
    ativo: {
      type: sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    foto: {
      type: sequelize.DataTypes.STRING,
      allowNull: true
    },
    titulo: {
      type: sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: sequelize.DataTypes.STRING,
      allowNull: true
    },
    quantidade: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    quantidadefoodtruck: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    valor: {
      type: sequelize.DataTypes.FLOAT,
      allowNull: false
    },
    pedidos: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    tipoentrega: {
      type: sequelize.DataTypes.ENUM('Delivery', 'Foodtruck', 'Ambos'),
      allowNull: false,
    },
    horariopedidos: {
      type: sequelize.DataTypes.TIME,
      allowNull: false,
    },
    horarioinicial: {
      type: sequelize.DataTypes.TIME,
      allowNull: false,
    },
    horariofinal: {
      type: sequelize.DataTypes.TIME,
      allowNull: false,
    },
    isfoodtruck: {
      type: sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    valoroperacional: {
      type: sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }})
    const Pedido = sequelize.define('Pedido', {
    ownid: {
      type: sequelize.DataTypes.UUID,
      defaultValue: sequelize.DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    status: {
      type: sequelize.DataTypes.ENUM('Feito', 'Aceito', 'Pronto', 'Entregue', 'Transito', 'Cancelado'),
      defaultValue: 'Feito'
    },
    status_pagamento_fisico: {
      type: sequelize.DataTypes.ENUM('Aguardando', 'Pago')
    },
    statuspagamento: {
      type: sequelize.DataTypes.ENUM('CREATED', 'WAITING', 'PAID', 'NOT_PAID', 'REVERTED'),
      defaultValue: 'CREATED'
    },
    formapagamento: {
      type: sequelize.DataTypes.ENUM('Alelo', 'Ticket', 'VR', 'Sodexo', 'Debito', 'Credito', 'Dinheiro', 'Outros'),
      defaultValue: null
    },
    tipoentrega: {
      type: sequelize.DataTypes.ENUM('Delivery', 'Foodtruck'),
      allowNull: false,
    },
    quantidade: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    previsaoinicial: {
      type: sequelize.DataTypes.TIME,
      allowNull: true
    },
    previsaofinal: {
      type: sequelize.DataTypes.TIME,
      allowNull: true
    },
    observacoes: {
      type: sequelize.DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    }
  })
  Ofertadodia.hasMany(models.Pedido, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'OfertadodiaId'
      }
  });
  Pedido.belongsTo(models.Ofertadodia, {
    as: 'Ofertadodia'
  });
  await sequelize.sync();
  await Ofertadodia.create({
    
  })
  await Promise.all([
      Pedido.create({
        quantidade: 1,
        tipoentrega: 'Foodtruck',
        status_pagamento_fisico: 'Aguardando',
        OfertadodiaId: 1,
      }
  ])
}

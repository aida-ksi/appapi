// models/Berita.js
import { DataTypes } from 'sequelize';
import db from '../db.js';
import User from './User.js';

const ObjekWisata = db.define('ObjekWisata', {
  nama_objek_wisata: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.hasMany(ObjekWisata, { foreignKey: 'adminId' });
ObjekWisata.belongsTo(User, { foreignKey: 'adminId' });

export default ObjekWisata;

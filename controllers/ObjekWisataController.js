import ObjekWisata from '../models/ObjekWisata.js';
import User from '../models/User.js';

export const addObjekWisata = async (req, res) => {
  const { nama_objek_wisata, kategori, alamat, detail, adminId } = req.body;
  // const gambar = req.file.filename;

  try {
    const user = await User.findByPk(adminId);
    if (!user) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const objek_wisata = await ObjekWisata.create({
      nama_objek_wisata,
      kategori,
      alamat,
      detail,
    });

    res.status(201).json(objek_wisata);
  } catch (err) {
    console.error('Error adding objek wisata:', err.message);
    res.status(500).send('Server error');
  }
};

export const getAllObjekWisata = async (req, res) => {
  try {
    const objek_wisataList = await ObjekWisata.findAll();
    res.json(objek_wisataList);
  } catch (err) {
    console.error('Error getting Objek Wisata:', err.message);
    res.status(500).send('Server error');
  }
};

export const getObjekWisataById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const objek_wisata = await ObjekWisata.findByPk(id);
    if (!objek_wisata) {
      return res.status(404).json({ msg: 'Objek Wisata not found' });
    }

    res.json(objek_wisata);
  } catch (err) {
    console.error('Error getting Objek Wisata:', err.message);
    res.status(500).send('Server error');
  }
};

import express from 'express';
import ObjekWisata from '../models/ObjekWisata.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// GET all objek wisata by adminId
router.get('/', verifyToken, async (req, res) => {
  try {
    const { id: adminId } = req.user; // Ambil adminId dari token yang sudah diverifikasi

    const objek_wisataList = await ObjekWisata.findAll({
      where: { adminId },
    });

    res.json(objek_wisataList);
  } catch (err) {
    console.error('Terjadi kesalahan saat mengambil Objek Wisata:', err.message);
    res.status(500).send('server error->periksa log error');
  }
});

// POST create objek wisata
router.post('/', verifyToken, async (req, res) => {
  try {
    const { nama_objek_wisata, kategori, alamat, detail } = req.body;
    const { id: adminId } = req.user;

    const objek_wisata = await ObjekWisata.create({ nama_objek_wisata, kategori, alamat, detail, adminId });
    res.json(objek_wisata);
  } catch (err) {
    console.error('Error creating Objek Wisata:', err.message);
    res.status(500).send('server error->periksa log error');
  }
});

// DELETE objek wisata by ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params; // Ambil ID objek wisata dari parameter URL
  const { id: adminId } = req.user; // Ambil adminId dari token yang sudah diverifikasi

  try {
    // Cari objek wisata berdasarkan id dan adminId
    const objek_wisata = await ObjekWisata.findOne({
      where: {
        id,
        adminId,
      },
    });

    if (!objek_wisata) {
      return res.status(404).json({ msg: 'Objek Wisata not found' });
    }

    await ObjekWisata.destroy({
      where: {
        id,
        adminId,
      },
    });

    res.json({ msg: 'Objek Wisata deleted successfully' });
  } catch (err) {
    console.error('Error deleting Objek Wisata:', err.message);
    res.status(500).send('server error->periksa log error');
  }
});

// PUT update objek wisata by ID
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params; // Ambil ID objek wisata dari parameter URL
  const { nama_objek_wisata, kategori, alamat, detail } = req.body;
  const { id: adminId } = req.user; // Ambil adminId dari token yang sudah diverifikasi

  try {
    // Cari objek wisata berdasarkan id dan adminId
    const objek_wisata = await ObjekWisata.findOne({
      where: {
        id,
        adminId,
      },
    });

    if (!objek_wisata) {
      return res.status(404).json({ msg: 'Objek Wisata not found' });
    }

    await ObjekWisata.update(
      {
        nama_objek_wisata: nama_objek_wisata || objek_wisata.nama_objek_wisata,
        kategori: kategori || objek_wisata.kategori,
        alamat: alamat || objek_wisata.alamat,
        detail: detail || objek_wisata.detail,
      },
      { where: { id, adminId } }
    );

    res.json({ msg: 'Objek Wisata updated successfully' });
  } catch (err) {
    console.error('Error updating Objek Wisata:', err.message);
    res.status(500).send('server error->periksa log error');
  }
});

export default router;

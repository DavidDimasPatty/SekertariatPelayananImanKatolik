require('dotenv').config()
const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var stringcon = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/GerejaDB`
const conn = mongoose.createConnection(stringcon);
const connect = async (e) => {
    await mongoose.connect(stringcon, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }).then(() => {
        console.log("Database Connect")
    }).catch(err => {
        console.log("Database Failed to Connect " + err)
    })
}

const adminscheme = new Schema({
    password: String,
    user: String

}, { collection: 'admin' });
var admin = mongoose.model('admin', adminscheme)

const sekeratiatscheme = new Schema({
    password: String,
    username: String

}, { collection: 'sekertariat' });
var sekertariat = mongoose.model('sekertariat', sekeratiatscheme)

const gerejascheme = new Schema({
    nama: String,
    address: String,
    kapasitas: String,
    paroki: String,
    lingkungan: String
}, { collection: 'Gereja' });
var gereja = mongoose.model('Gereja', gerejascheme)

const umumscheme = new Schema({
    namaKegiatan: String,
    idGereja: ObjectID,
    temaKegiatan: String,
    jenisKegiatan: String,
    deskripsiKegiatan: String,
    tamu: String,
    kapasitas: Number,
    tanggal: Date,
    lokasi: String,

}, { collection: 'umum' });
var umum = mongoose.model('umum', umumscheme)

const userscheme = new Schema({
    name: String,
    email: String,
    password: String,
    picture: String,
    banned: String,
}, { collection: 'user' });
var user = mongoose.model('user', userscheme)

const userUmumscheme = new Schema({
    idUser: ObjectID,
    idKegiatan: ObjectID,
    tanggalDaftar:Date
}, { collection: 'userUmum' });
var userUmum = mongoose.model('userUmum', userUmumscheme)



async function getAllGereja() {
    var arr = []
    await gereja.find().then((res) => {
        arr = res;
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getAllUser() {
    var arr = []
    await user.find().then((res) => {
        arr = res;
    }).catch((e) => {
        console.log(e)
    })
    return arr
}


async function getIdUser(id, pw) {
    var arr = []
    console.log(id);
    await admin.find({
        $and: [
            { user: id },
            { password: pw }
        ]
    }).then((res) => {
        arr = res;
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getAllUmum(id) {
    var arr = []
    await umum.find({
        $and: [
            { idGereja: id }
        ]
    }).then((res) => {
        arr = res;
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getAllUserKegiatan(id) {
    var arr = []
    console.log(id);
    await userUmum.aggregate(
   [ 
    {
        $match: 
            { idKegiatan: id }
        
    },
    {
        $lookup: {
          from: "user",
          localField: "idUser",
          foreignField: "_id",
          as: "members"
        }
      }],
    ).then((res) => {
        arr = res;
    }).catch((e) => {
        console.log(e)
    })
    return arr
}


async function getIdUmum(id) {
    var arr = [];
    await umum.find({
        $and: [
            { _id: id }
        ]
    }).then((res) => {
        arr = res;
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getIdSekertariat(id, pw) {
    var arr = []
    console.log(id);
    await sekertariat.find({
        $and: [
            { username: id },
            { password: pw }
        ]
    }).then((res) => {
        arr = res;
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getUserEmail(email) {
    var arr = []
    await user.find({
        $and: [
            { email: email },
        ]
    }).then((res) => {
        arr = res;
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function getIdGereja(id) {
    var arr = []
    console.log(id);
    await gereja.findById(id).then((res) => {
        arr = res;
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
    return arr
}

async function updateGereja(item) {
    await gereja.updateOne(
        { _id: item.id },
        { $set: { nama: item.nama, address: item.address, kapasitas: item.kapasitas, paroki: item.paroki, lingkungan: item.lingkungan } },
        { upsert: true } // Make this update into an upsert
    );
}

async function updateKegiatan(item) {
    await umum.updateOne(
        { _id: item.id },
        {
            $set: {
                namaKegiatan: item.namaKegiatan,
                lokasi: item.lokasi,
                tanggal: item.tanggal,
                jenisKegiatan: item.jenisKegiatan,
                temaKegiatan: item.temaKegiatan,
                deskripsiKegiatan: item.deskripsiKegiatan,
                tamu: item.tamu,
                kapasitas: item.kapasitas
            }
        },
        { upsert: true } // Make this update into an upsert
    );
}
async function updatePassword(item) {
    await user.updateOne(
        { email: item.email },
        { $set: { password: item.password } },
        { upsert: true } // Make this update into an upsert
    );
}


function addGereja(item) {
    const newData = {
        nama: item.body.nama,
        address: item.body.address,
        kapasitas: item.body.kapasitas,
        paroki: item.body.paroki,
        lingkungan: item.body.lingkungan
    }
    var data = new gereja(newData);
    data.save();
}

async function addKegiatan(item) {
    console.log(item.body.data.idGereja);
    const newData = {
        idGereja: item.body.data.idGereja,
        namaKegiatan: item.body.data.namaKegiatan,
        lokasi: item.body.data.lokasi,
        tanggal: item.body.data.tanggal,
        jenisKegiatan: item.body.data.jenisKegiatan,
        temaKegiatan: item.body.data.temaKegiatan,
        deskripsiKegiatan: item.body.data.deskripsiKegiatan,
        tamu: item.body.data.tamu,
        kapasitas: item.body.data.kapasitas
    }
    var data = new umum(newData);
    data.save();

}
function deletegereja(item) {
    gereja.findByIdAndRemove(item).exec();
}

function deletekegiatan(item) {
    umum.findByIdAndRemove(item).exec();
}


function deleteUser(item) {
    user.findByIdAndRemove(item).exec();
}

async function bannedUser(item) {
    console.log(item.id);
    if (item.banned == 0) {
        await user.updateOne(
            { _id: item.id },
            { $set: { banned: "1" } },
            { upsert: true } // Make this update into an upsert
        ).catch((e) => {
            console.log(e);
        });
    }
    else {
        await user.updateOne(
            { _id: item.id },
            { $set: { banned: "0" } },
            { upsert: true } // Make this update into an upsert
        ).catch((e) => {
            console.log(e);
        });
    }
}

module.exports = {
    connect: connect,
    getIdUser: getIdUser,
    getAllGereja: getAllGereja,
    getAllUser: getAllUser,
    getIdGereja: getIdGereja,
    updateGereja: updateGereja,
    addGereja: addGereja,
    deletegereja: deletegereja,
    deleteUser: deleteUser,
    bannedUser: bannedUser,
    updatePassword: updatePassword,
    getUserEmail: getUserEmail,
    getIdSekertariat: getIdSekertariat,
    getAllUmum: getAllUmum,
    getIdUmum: getIdUmum,
    updateKegiatan: updateKegiatan,
    addKegiatan:addKegiatan,
    deletekegiatan:deletekegiatan,
    getAllUserKegiatan:getAllUserKegiatan
}
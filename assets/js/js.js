
var btns = document.querySelectorAll('.btn-toolbar [id^="btn"]');
btns.forEach(function (btn) {
    btn.addEventListener('click', function() {
        var divs = document.querySelectorAll('.bt');
        divs.forEach(function (div) {
            div.style.display = 'none';
        });

        var divId = 'bt' + this.id.replace('btn', '');
        var div = document.querySelector('.' + divId);
        div.style.display = 'block';
    });
});
document.querySelector('.bt1 .submitBtn').addEventListener('click', function(){
    var diem1 = document.querySelector('.bt1 #d1').value*1;
    var diem2 = document.querySelector('.bt1 #d2').value*1;
    var diem3 = document.querySelector('.bt1 #d3').value*1;
    var diemChuan = document.querySelector('.bt1 #dc').value*1;
    var khuVuc = document.querySelector('.bt1 #slt-kv').value;
    var doiTuong = document.querySelector('.bt1 #slt-dt').value;
    var ketQua = document.querySelector('.bt1 .ketQua h3');

    var isPassed = kiemTraDieuKienDat(diem1, diem2, diem3);
    if(isPassed){
            var tongDiem = diem1 + diem2 + diem3 + diemUuTienDoiTuong(doiTuong) + diemUuTienKhuVuc(khuVuc);
            ketQua.innerHTML = `${kiemTraDat(tongDiem, diemChuan)}, điểm của bạn : ${tongDiem}`;   
    }
    else
        ketQua.innerHTML = 'Bạn đã rớt do có một hoặc nhiều điểm 0';
})
function kiemTraDat(tongDiem, diemChuan){
    return (tongDiem < diemChuan) ? 'Bạn đã trượt' : 'Bạn đã đỗ';
}
function kiemTraDieuKienDat(diem1, diem2, diem3){
    if(diem1 <= 0 || diem2 <= 0|| diem3 <= 0){
        return false;
    }
    return true;
}

function diemUuTienKhuVuc(khuVuc){
    switch(khuVuc){
        case '' : return 0;
        case 'opt-a': return 2;
        case 'opt-b': return 1;
        case 'opt-c': return 0.5;
    }
}

function diemUuTienDoiTuong(khuVuc){
    switch(khuVuc){
        case '' : return 0;
        case 'opt-1': return 2.5;
        case 'opt-2': return 1.5;
        case 'opt-3': return 1;
    }
}

document.querySelector('.bt2 .submitBtn').addEventListener('click', function(){
    var hoTen = document.querySelector('.bt2 input[type="text"]').value;
    var soKw = document.querySelector('.bt2 input[type="number"]').value*1;
    var ketQua = document.querySelector('.bt2 .ketQua h3');

    if(isValid(hoTen, soKw)){
        ketQua.innerHTML = `Họ tên : ${hoTen}, số tiền điện cần trả : ${tinhTienDien(soKw)}`;
    }
    else 
        alert('Có vẻ bạn đã nhập thiếu gì đó');
})

function tinhTienDien(soKw){
    const FROM_0_TO_50 = 500;
    const FROM_51_TO_100 = 650;
    const FROM_101_TO_200 = 850;
    const FROM_201_TO_350 = 1100;
    const REST = 1300;

    var tienDien = 0;

    if (soKw <= 50) {
        tienDien = soKw * FROM_0_TO_50;
    } else if (soKw <= 100) {
        tienDien = 50 * FROM_0_TO_50 + (soKw - 50) * FROM_51_TO_100;
    } else if (soKw <= 200) {
        tienDien = 50 * FROM_0_TO_50 + 50 * FROM_51_TO_100 + (soKw - 100) * FROM_101_TO_200;
    } else if (soKw <= 350) {
        tienDien = 50 * FROM_0_TO_50 + 50 * FROM_51_TO_100 + 100 * FROM_101_TO_200 + (soKw - 200) * FROM_201_TO_350;
    } else {
        tienDien = 50 * FROM_0_TO_50 + 50 * FROM_51_TO_100 + 100 * FROM_101_TO_200 + 150 * FROM_201_TO_350 + (soKw - 350) * REST;
    }

    return tienDien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}   

function isValid(...params) {
    for (var arg of params) {
      if (arg === null || arg === undefined || arg <= 0) {
        return false;
      }
    }
    return true;
}


document.querySelector('.bt3 .submitBtn').addEventListener('click', function(){
    var hoTen = document.querySelector('.bt3 #n').value;
    var thuNhap = document.querySelector('.bt3 #tn').value*1;
    var phuThuoc = document.querySelector('.bt3 #pt').value*1;
    var ketQua = document.querySelector('.bt3 .ketQua h3');
    if(isValid(hoTen, thuNhap, phuThuoc)){
            ketQua.innerHTML = `Họ tên : ${hoTen}, tiền thuế : ${tinhThueThuNhap(thuNhap, phuThuoc)}`;
    }
    else
        alert("Có vẻ bạn đã nhập thiếu gì đó");
})

function tinhThueThuNhap(thuNhap, phuThuoc){
    var tienThue = 0;
    if(thuNhap <= 60000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.05;
    }
    else if(thuNhap <= 120000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.1;
    }
    else if(thuNhap <= 210000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.15;
    }
    else if(thuNhap <= 384000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.2;
    }
    else if(thuNhap <= 624000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.25;
    }
    else if(thuNhap <= 960000000){
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.3;
    }
    else
        tienThue = (thuNhap - 4000000 - (phuThuoc * 1600000))*0.35;
    if(tienThue <= 0){
        alert('Số tiền thu nhập không hợp lê!');
        return '0 VNĐ'
    }
    return tienThue.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}


document.querySelector('.bt4 .submitBtn').addEventListener('click', function(){
    var mkh = document.querySelector('.bt4 #mkh').value;
    var sc = document.querySelector('.bt4 #sc').value*1;
    var ketQua = document.querySelector('.bt4 .ketQua h3');
    
    tinhTienCap(sc, skn, ketQua, mkh)

})

function tinhTienCap(sc, skn, kq, mkh){
    var rs = function(tc, mkh){
        return `Mã khách hàng ${mkh}, tiền cáp : ${tc.toLocaleString('it-IT', {style : 'currency', currency : 'USD'})}`;
    }
    
    if(isValid(lkh.value, mkh, sc)){
        if(lkh.value == 'kh1'){
            kq.innerHTML = rs(4.5+20.5+(sc*7.5), mkh);
        }
        else{
            var skn = document.querySelector('.bt4 #skn').value*1;
            if(skn<=10)
            kq.innerHTML = rs(15+75+(50*sc), mkh);
            else
            kq.innerHTML = rs(15+75+((skn-10)*5)+(sc*50), mkh);
        }
    }
    else
        alert("Có vẻ bạn đã nhập thiếu gì đó")
    
}
var lkh = document.querySelector('.bt4 #slt-lkh');
lkh.addEventListener('change', (e)=>{
    if(e.target.value == 'kh2'){
        document.querySelector('.bt4 #skn').classList.remove('d-none')
    }
    else
    document.querySelector('.bt4 #skn').classList.add('d-none')
})
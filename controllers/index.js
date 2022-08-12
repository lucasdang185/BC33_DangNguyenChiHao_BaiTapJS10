/** Xử lý chức năng giao diện */


 var staffList = [];

 function createStaff() {
   // 1. lấy thông tin từ input
   var staffID = document.querySelector("#tknv").value;
   var staffName = document.querySelector("#name").value;
   var staffEmail = document.querySelector("#email").value;
   var staffPass = document.querySelector("#password").value;
   var staffDay = document.querySelector("#datepicker").value;
   var staffSalary = document.querySelector("#luongCB").value;
   var staffLevel = document.querySelector("#chucvu").value;
   var staffWorkTime = document.querySelector("#gioLam").value;
 

 
   // 2. tạo đối tượng nhan vien
 
   var staff = new NhanVien(
    staffID,
    staffName,
    staffEmail,
    staffPass,
    staffDay,
    staffSalary,
    staffLevel,
    staffWorkTime
   );
 
   console.log(staff);
 
   ///* ------------------------- Kiểm tra dữ liệu đầu vào ----------------------------------
   /*
     Kiểm tra rỗng
   */
 
     var valid = true;
     //.trim(): Loại bỏ khoảng trắng đầu và cuối của chuỗi Ví dụ:     => ''
     if(staff.id.trim() === '') {
       // alert('mã sinh viên không được bỏ trống !');
       document.querySelector('#tbTKNV').innerHTML = 'Mã nhân viên không được bỏ trống';
       valid = false;
     }
     if(staff.name.trim() === '') {
       // alert('tên sinh viên không được bỏ trống !');
       document.querySelector('#tbTen').innerHTML = 'Tên nhân viên không được bỏ trống';
       valid = false;
     }
 
     if(!valid){
       return;
     }
 
 
   // 3. push đối tượng nhân viên vào danh sách
   staffList.push(staff);
   //Gọi hàm tạo table sau khi thêm 1 nhân viên mới vào
   // console.table(studentList); 
   renderStaffList(staffList);
 
   //gọi hàm lưu vào localstorage sau khi thêm sinh viên
   saveLocalStorage(staffList, 'arrNV');
 }


 function renderStaffList(arrNV) { 
   var output = '';
   for (var index = 0; index < arrNV.length; index++) {
     var obNhanVien = arrNV[index];
    //  obNhanVien.calcGPA = function () {
    //    return (this.math + this.physic + this.chemistry) / 3;
    //  };
     var trNV = `
         <tr>
           <td>${obNhanVien.id}</td>
           <td>${obNhanVien.name}</td>
           <td>${obNhanVien.email}</td>
           <td>${obNhanVien.staffDay}</td>
           <td>${obNhanVien.staffLevel}</td>
           <td></td>
           <td></td>

           <td>
             <button class="btn btn-danger"  onclick="delStaff('${obNhanVien.id}')">Del</button>
             <button class="btn btn-primary" data-target="#myModal onclick="editStaff('${obNhanVien.id}')">Update</button>
           </td>
         </tr>
       `;
 
     output += trNV;
   }
   document.querySelector('tbody').innerHTML = output;
   return output;

 }

 function editStaff(idClick) {
   var nvEdit = null;
   for (var index = 0; index < staffList.length; index++) {
     if (staffList[index].id == idClick) {
       //Tại vị trí này tìm thấy idClick = id object trong mảng
       nvEdit = staffList[index];
       break;
     }
   }
   if (nvEdit !== null) {
     //Đưa dữ liệu lên các control input
     document.querySelector('#tknv').value = nvEdit.id;
     document.querySelector('#name').value = nvEdit.name;
     document.querySelector('#email').value = nvEdit.email;
     document.querySelector('#password').value = nvEdit.pass;
     document.querySelector('#datepicker').value = nvEdit.day;
     document.querySelector('#luongCB').value = nvEdit.salary;
     document.querySelector('#chucvu').value = nvEdit.level;
     document.querySelector('#gioLam').value = nvEdit.workTime;
   }
 }
 
 
 
 
 function delStaff(idClick) { // input id: giá trị người dùng click
   //output: index    //                 0   1   2
   var indexDel = -1; // studentList = [{1},{2},{3}] studentList[2].name ='abc';
   for (var index = staffList.length - 1; index >= 0; index--) {
     //Mỗi lần duyệt lấy ra 1 phần tử của mảng so với input người dùng click
     if (staffList[index].id == idClick) {
       // indexDel = index; //Lưu lại vị trí id click = sinhVien có mã trùng với idClick
       // break; //thoát ra khỏi vòng lặp
       staffList.splice(index, 1);
     }
   }
   renderStaffList(studentList);
 
 }
 
 
 //Khi người dùng thay đổi sau đó bấm nút update 
 function updateStaff() {
   var svUpdate = new Student();
   svUpdate.id = document.querySelector('#txtMaSV').value;
   svUpdate.name = document.querySelector('#txtTenSV').value;
   svUpdate.email = document.querySelector('#txtEmail').value;
   svUpdate.dob = document.querySelector('#txtNgaySinh').value;
   svUpdate.course = document.querySelector('#khSV').value;
   svUpdate.physic = document.querySelector('#txtDiemLy').value;
   svUpdate.chemistry = document.querySelector('#txtDiemHoa').value;
   svUpdate.math = document.querySelector('#txtDiemToan').value;
   console.log(svUpdate);
   //Duyệt qua từng object trong studentList tìm ra vị trí của object cần thay đổi
   //                 0      1      2
   //studentList = [{id:1},{id:2},{id:3}]
   let indexEdit = -1;
   for (var index = 0; index < studentList.length; index++) {
     if (studentList[index].id === svUpdate.id) {
       indexEdit = index; //1
       break;
     }
   }
   if (indexEdit !== -1) {
     //Nếu tìm thấy vị trí trong mảng thì lấy object trong mảng gán lại = object trên giao diện người dùng thay đổi
     // studentList[indexEdit] = svUpdate;
     studentList[indexEdit].name = svUpdate.name;
     studentList[indexEdit].email = svUpdate.email;
     studentList[indexEdit].dob = svUpdate.dob;
     studentList[indexEdit].course = svUpdate.course;
     studentList[indexEdit].physic = svUpdate.physic;
     studentList[indexEdit].chemistry = svUpdate.chemistry;
     studentList[indexEdit].math = svUpdate.math;
     //Gọi hàm rendertable truyền cho hàm mảng mới
     renderStudentList(studentList);
   }
 }

 /**
  * Hàm lưu trữ object({}) hoặc array ([]) vào localstorage
  * @param {*} ob Dữ liệu cần lưu 
  * @param {*} key keyName trong localstorage
  */
 
 function saveLocalStorage(ob, key) { // {} , []
   var str = JSON.stringify(ob);
   localStorage.setItem(key, str);
 }
 
 /**
  * Hàm nhận vào keyName để lấy ra giá trị từ localstorage theo key đó
  * @param {*} key : tên của item trong localStorage
  * @returns trả về object được lấy ra theo key
  */
 
 function getLocalStorage(key) {
   //Lấy dữ liệu từ localstorage ra (dữ liệu lấy là string)
   if (localStorage.getItem(key)) {
     var str = localStorage.getItem(key);
     //Parse dữ liệu về lại object
     var ob = JSON.parse(str);
     return ob;
   }
   return undefined;
 }
 
 //đợi html js load xong thì sẽ động thực thi
 window.onload = function () {
   //Lấy ra array sinh viên từ localstorage gán vào studenList
   studentList = getLocalStorage('arrNV');
   console.log('staffList', staffList);
   if (staffList === undefined) {
    staffList = [];
   }
   renderStaffList(staffList);
 }
 // searchStudent();hoisting
 var searchStudent = function () {  //expression function(Không hỗ hoisting)
   //input: tuKhoa : string
   var tuKhoa = document.querySelector('#txtSearch').value; //a
   tuKhoa = removeVietnameseTones(tuKhoa);// nguyễn => nguyen
   //output: ?? []: arraySinhVien
   var output = [];
   //process:
   //B1: duyệt qua từng phần tử của mảng 
   //B2: Kiểm tra tên có chứa từ khoá hay không
   //B3: Nếu có thì đưa object đó vào output
   //                  0        1         2
   // studentList = [{id,name},{id,name},{id,name}]
   for (var index = 0; index < studentList.length; index++) {
     // nguyễn văn a.search('a') => 11
     // nguyễn văn b.search('a') => -1
     // nguyễn văn c.search('a') => -1
     var tenSinhVien = removeVietnameseTones(studentList[index].name); // => nguyen van a.search(nguyen)
     if (tenSinhVien.search(tuKhoa) != -1 || studentList[index].id == tuKhoa) {
       //Tìm thấy => add object tại vị trí đó vào output
       output.push(studentList[index]);
     }
   }
   //Dùng output render ra table
   renderStudentList(output);
 }
 //Dom đến txtSearch cài đặt sự kiện oninput cho nó
 document.querySelector('#txtSearch').oninput = searchStudent;
 //Tìm kiếm
 document.querySelector('#btnSearch').onclick = searchStudent;
 
 
 function removeVietnameseTones(str) {
   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
   str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
   str = str.replace(/đ/g, "d");
   str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
   str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
   str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
   str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
   str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
   str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
   str = str.replace(/Đ/g, "D");
   // Some system encode vietnamese combining accent as individual utf-8 characters
   // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
   str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
   str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
   // Remove extra spaces
   // Bỏ các khoảng trắng liền nhau
   str = str.replace(/ + /g, " ");
   str = str.trim();
   // Remove punctuations
   // Bỏ dấu câu, kí tự đặc biệt
   str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
   return str;
 }
 

// // Get data

// function getDataStaffApi() {
//   var promise = axios({
//     url: "../data/data.json",
//     method: "GET",
//   });

//   //thanh cong
//   promise.then(function (result) {
//     console.log("result", result.data);
//     renderNhanVien(result.data);
//   });

//   //that bai
//   promise.catch(function (err) {
//     console.log(err);
//   });
// }

// window.onload = function () {
//   //goi api
//   getDataStaffApi();
// };

// function renderNhanVien(arrNhanVien) {
//   var html = "";
//   for (var i = 0; i < arrNhanVien.length; i++) {
//     var nv = arrNhanVien[i];
//     html += `
//         <tr>
//         <td>${nv.maNhanVien}</td>
//         <td>${nv.tenNhanVien}</td>
//         <td>${nv.email}</td>
//         <td>${nv.ngaylam}</td>
//         <td>${nv.chucVu}</td>
//         <td></td>
//         <td></td>
//         <td>
//             <button class="btn btn-primary" onclick="chinhsua('${nv.maNhanVien}')">Sửa</button>
//             <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
//         </td>
//         </tr>
//         `;
//   }
//   document.querySelector('tbody').innerHTML = html;
// }

// /** POST: thêm dữ liệu */
// document.querySelector('#btnThemNV').onclick = function(){
//     // laasy thoong tin tu nguoi dung 
//     var nhanVien = new NhanVien();
//     nhanVien.maNhanVien = document.querySelector('#tknv').value;
//     nhanVien.tenNhanVien = document.querySelector('#name').value;
//     nhanVien.email = document.querySelector('#email').value;
//     nhanVien.password = document.querySelector('#password').value;
//     nhanVien.ngaylam = document.querySelector('#datepicker').value;
//     nhanVien.luongCoBan = document.querySelector('#luongCB').value;
//     nhanVien.chucVu = document.querySelector('#chucvu').value;
//     nhanVien.soGioLamTrongThang = document.querySelector('#gioLam').value;
//     console.log('nhanVien',nhanVien);

//     var promise = axios({
//         url:'../data/data.json',
//         method:'POST',
//         // data:nhanVien
//     })

//     promise.then(function(result){
//         console.log(result.data);
//         getDataStaffApi();
//     })

//     promise.catch(function(error){
//         console.log(error);
//     })
// }

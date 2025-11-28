// JavaScript Document
// نمایش فرم‌های مختلف
document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
});

document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('register-container').style.display = 'flex';
});

document.getElementById('to-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'flex';
});

document.getElementById('to-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
});

document.getElementById('back-from-login').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-page').style.display = 'flex';
});

document.getElementById('back-from-register').addEventListener('click', function() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('main-page').style.display = 'flex';
});

// مدیریت فرم ثبت‌نام
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // ذخیره اطلاعات کاربر در localStorage
    const user = {
        name: name,
        email: email,
        password: password,
        profileImage: 'https://via.placeholder.com/150'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // نمایش پروفایل کاربر
    showProfile(user);
});

// مدیریت فرم ورود
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // بازیابی اطلاعات کاربر از localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        showProfile(storedUser);
    } else {
        alert('ایمیل یا رمز عبور نادرست است!');
    }
});

// نمایش پروفایل کاربر
function showProfile(user) {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('profile-container').style.display = 'flex';
    
    // پر کردن اطلاعات پروفایل
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-img').src = user.profileImage;
    
    // پر کردن فرم ویرایش
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
}

// مدیریت منوی پروفایل
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // حذف کلاس active از همه آیتم‌ها
        menuItems.forEach(i => i.classList.remove('active'));
        
        // اضافه کردن کلاس active به آیتم انتخاب شده
        this.classList.add('active');
        
        // مخفی کردن تمام محتواها
        const tabContents = document.querySelectorAll('.tab-content');

tabContents.forEach(content => content.classList.remove('active'));
        
        // نمایش محتوای مربوطه
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// مدیریت فرم ویرایش پروفایل
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const password = document.getElementById('edit-password').value;
    
    // بازیابی کاربر از localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // به‌روزرسانی اطلاعات
    user.name = name;
    user.email = email;
    
    if (password) {
        user.password = password;
    }
    
    // ذخیره اطلاعات به‌روزرسانی شده
    localStorage.setItem('user', JSON.stringify(user));
    
    // به‌روزرسانی نمایش پروفایل
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    
    alert('تغییرات با موفقیت ذخیره شد!');
});

// مدیریت آپلود عکس پروفایل
document.getElementById('image-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.getElementById('profile-img').src = imageUrl;
            
            // ذخیره در localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            user.profileImage = imageUrl;
            localStorage.setItem('user', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
    }
});

// مدیریت خروج از حساب
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('main-page').style.display = 'flex';
});

// بررسی اینکه آیا کاربر قبلاً وارد شده است
window.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showProfile(user);
    }
});
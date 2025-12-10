// تعريف المتغيرات الرئيسية
const appInterface = document.getElementById('app-interface');
const floatingIcon = document.getElementById('floating-icon');
const loginScreen = document.getElementById('login-screen');
const predictionsScreen = document.getElementById('predictions-screen');

const serverButtons = document.querySelectorAll('.server-btn');
const connectionStatus = document.getElementById('connection-status');
const userIdInput = document.getElementById('user-id');
const activationCodeInput = document.getElementById('activation-code');
const loginBtn = document.getElementById('login-btn');
const getCodeBtn = document.getElementById('get-code-btn');
const newRoundBtn = document.getElementById('new-round-btn');
const predictionOutput = document.getElementById('prediction-output');
const logoutBtn = document.getElementById('logout-btn');

// كود التفعيل الصحيح
const CORRECT_CODE = 'JOKER 1X 120';

// ** 1. وظيفة الأيقونة العائمة **
function toggleInterface() {
    // تظهر الأيقونة واجهة التطبيق وتخفيها
    if (appInterface.classList.contains('hidden')) {
        appInterface.classList.remove('hidden');
        floatingIcon.style.opacity = '0.5'; // تخفت الأيقونة قليلاً عند ظهور الواجهة
    } else {
        appInterface.classList.add('hidden');
        floatingIcon.style.opacity = '1';
    }
}

// ابدأ بإخفاء الواجهة الرئيسية وترك الأيقونة فقط
// يمكنك إزالة هذا السطر إذا أردت الواجهة أن تكون مرئية بشكل افتراضي
// appInterface.classList.add('hidden'); 


// ** 2. محاكاة الاتصال بالسيرفر **
serverButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serverName = button.textContent;
        const duration = 7000; // 7 ثواني

        // تعطيل الأزرار وبدء حالة الاتصال
        serverButtons.forEach(btn => btn.disabled = true);
        connectionStatus.textContent = `جاري الاتصال بسيرفر ${serverName}...`;
        button.classList.add('connecting');
        
        // محاكاة فترة الانتظار
        setTimeout(() => {
            // إعادة تفعيل الأزرار وإنهاء حالة الاتصال
            serverButtons.forEach(btn => btn.disabled = false);
            connectionStatus.textContent = `✅ تم الاتصال بنجاح بسيرفر ${serverName}`;
            button.classList.remove('connecting');
            
            // إزالة الرسالة بعد فترة قصيرة
            setTimeout(() => {
                connectionStatus.textContent = '';
            }, 3000);
            
        }, duration);
    });
});


// ** 3. منطق تسجيل الدخول **
loginBtn.addEventListener('click', () => {
    const userId = userIdInput.value.trim();
    const activationCode = activationCodeInput.value.trim();

    // التحقق من ID (10 أرقام)
    if (!/^\d{10}$/.test(userId)) {
        alert('❌ خطأ: يجب أن يتكون ID اللاعب من 10 أرقام بالضبط.');
        return;
    }

    // التحقق من كود التفعيل
    if (activationCode !== CORRECT_CODE) {
        alert('❌ خطأ: كود التفعيل غير صحيح.');
        return;
    }

    // تسجيل دخول ناجح
    alert('✅ تم تسجيل الدخول بنجاح! مرحباً بك في JOKER PREDICTOR');
    
    loginScreen.classList.add('hidden');
    predictionsScreen.classList.remove('hidden');
    
    // عرض التوقع الأولي
    generateNewPrediction();
});


// ** 4. زر استلام كود التفعيل **
getCodeBtn.addEventListener('click', () => {
    const telegramLink = 'https://t.me/Joker_600j';
    // فتح الرابط في نافذة/تبويب جديد
    window.open(telegramLink, '_blank');
});


// ** 5. وظيفة توليد التوقعات **
function generateNewPrediction() {
    // هذه محاكاة بسيطة للتوقعات
    // توليد رقم عشوائي بين 1.00 و 10.00 بمضاعفات 0.01
    const min = 1.00;
    const max = 10.00;
    const randomMultiplier = (Math.random() * (max - min) + min).toFixed(2);
    
    predictionOutput.innerHTML = `X${randomMultiplier}`;
    
    // إضافة رسالة تحذيرية تعليمية
    console.warn(`التوقع الجديد: X${randomMultiplier}. تذكر أن هذا النموذج لأغراض المحاكاة فقط. ألعاب Crash عشوائية ولا يمكن توقعها بدقة.`);
}

// ** 6. زر دور جديد **
newRoundBtn.addEventListener('click', generateNewPrediction);

// ** 7. زر تسجيل الخروج **
logoutBtn.addEventListener('click', () => {
    // تنظيف الحقول والعودة لشاشة تسجيل الدخول
    userIdInput.value = '';
    activationCodeInput.value = '';
    
    predictionsScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

import React from 'react';
import { FaRegHandshake, FaMedal, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Banner giới thiệu */}
      <div className="bg-blue-600 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Về LaptopShop</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Đối tác tin cậy cung cấp các giải pháp công nghệ hàng đầu cho học tập và làm việc.
        </p>
      </div>

      <div className="container py-16">
        {/* Câu chuyện thương hiệu */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="md:w-1/2">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team working" 
                    className="rounded-lg shadow-lg"
                />
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu chuyện của chúng tôi</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Thành lập năm 2024, LaptopShop bắt đầu với một sứ mệnh đơn giản: Mang lại những chiếc laptop chất lượng cao với giá thành hợp lý nhất cho sinh viên và nhân viên văn phòng.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Chúng tôi không chỉ bán sản phẩm, chúng tôi bán sự an tâm. Mỗi chiếc máy tính bán ra đều trải qua quy trình kiểm tra nghiêm ngặt 12 bước để đảm bảo hiệu suất tốt nhất khi đến tay khách hàng.
                </p>
            </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FeatureCard 
                icon={<FaRegHandshake />}
                title="Uy Tín Hàng Đầu"
                desc="Cam kết hàng chính hãng 100%, nói không với hàng dựng, hàng kém chất lượng."
            />
            <FeatureCard 
                icon={<FaMedal />}
                title="Chất Lượng Đảm Bảo"
                desc="Chế độ bảo hành 12 tháng, lỗi 1 đổi 1 trong 30 ngày đầu tiên."
            />
            <FeatureCard 
                icon={<FaUsers />}
                title="Hỗ Trợ Tận Tâm"
                desc="Đội ngũ kỹ thuật viên giàu kinh nghiệm, hỗ trợ cài đặt phần mềm trọn đời."
            />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
        <div className="text-4xl text-blue-600 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </div>
);

export default AboutPage;

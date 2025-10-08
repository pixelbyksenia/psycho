import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#290446] mt-10 py-6 rounded-t-3xl shadow-md">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        {/* Левая часть */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-medium">
            © {new Date().getFullYear()} Все права защищены
          </p>
          <p>Автор: Анна Иванова, дипломированный психолог</p>
          <a href="tel:+79991234567" className="hover:underline transition">
            📞 +7 (999) 123-45-67
          </a>
        </div>

        {/* Средняя часть */}
        <div className="flex flex-col items-center gap-1">
          <a
            href="/privacy-policy"
            className="text-[#B0AAB5] hover:text-[#290446] transition"
          >
            Политика конфиденциальности
          </a>
          <a
            href="/terms-of-use"
            className="text-[#B0AAB5] hover:text-[#290446] transition"
          >
            Условия использования
          </a>
        </div>

        {/* Правая часть */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p>ИНН 1234567890</p>
          <p>ОГРН 321770000000000</p>
          <p>
            Электронная почта:{" "}
            <a
              href="mailto:info@example.com"
              className="hover:underline transition"
            >
              info@example.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

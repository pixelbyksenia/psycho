import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#290446] mt-10 pt-6 pb-4 rounded-t-3xl shadow-md">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
        {/* Верхний блок */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          {/* Левая часть */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-medium">
              © {new Date().getFullYear()} Все права защищены
            </p>
            <p>Автор: Василенко Оксана Игоревна</p>
            <a href="tel:+380639978032" className="hover:underline transition">
              📞 +380 639-978-032
            </a>
          </div>

          {/* Средняя часть */}
          <div className="flex flex-col items-center gap-1">
            <Link
              href="/privacy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B0AAB5] hover:text-[#290446] transition"
            >
              Политика конфиденциальности
            </Link>

            <Link
              href="/public-offer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B0AAB5] hover:text-[#290446] transition"
            >
              Условия использования
            </Link>
          </div>

          {/* Правая часть — иконки соцсетей */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/psihologvasilenko?igsh=dm9tcjk2a3ExejJt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#290446]/5 rounded-full hover:bg-[#290446]/10 transition"
              >
                <InstagramIcon style={{ color: "#290446", fontSize: 24 }} />
              </a>
              <a
                href="https://t.me/PsihologVasilenko"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#290446]/5 rounded-full hover:bg-[#290446]/10 transition"
              >
                <TelegramIcon style={{ color: "#290446", fontSize: 24 }} />
              </a>
            </div>

            <div className="text-xs mt-2 text-[#B0AAB5]">ІПН 3286818121</div>
            <p className="text-xs">
              Электронная почта:{" "}
              <a
                href="ksenavasilenko89@gmail.com"
                className="hover:underline transition"
              >
                ksenavasilenko89@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Нижний блок */}
        <div className="border-t border-[#E6E6E6] pt-3 text-center text-xs text-[#B0AAB5]">
          Powered by{" "}
          <a
            href="https://www.instagram.com/prostoksyu__/="
            rel="noopener noreferrer"
            className="underline hover:text-[#290446] transition"
          >
            @prostoksyu__
          </a>
        </div>
      </div>
    </footer>
  );
}

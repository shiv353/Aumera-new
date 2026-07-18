export default function Footer() {
    return (
      <footer className="bg-[#0A3323] text-[#F7F4D5]">
  
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
  
          <div className="grid md:grid-cols-4 gap-12">
  
            {/* Brand */}
  
            <div>
  
              <img
                src="/logo.png"
                alt="The Aumera Gifts"
                className="w-[170px] h-[55px] object-contain mb-6"
              />
  
              <p className="text-[#839958] leading-7">
                Luxury gifting, thoughtfully curated.
                <br />
                Designed to celebrate every occasion with elegance.
              </p>
  
            </div>
  
            {/* Collections */}
  
            <div>
  
              <h3 className="text-xl mb-6">
                Collections
              </h3>
  
              <ul className="space-y-3 text-[#839958]">
  
                <li>
                  <a href="/rakhi" className="hover:text-[#F7F4D5] transition">
                    Rakhi Collection
                  </a>
                </li>
  
                <li>
                  <a href="#" className="hover:text-[#F7F4D5] transition">
                    Corporate Gifts
                  </a>
                </li>
  
                <li>
                  <a href="#" className="hover:text-[#F7F4D5] transition">
                    Festive Hampers
                  </a>
                </li>
  
                <li>
                  <a href="#" className="hover:text-[#F7F4D5] transition">
                    Personalised Gifts
                  </a>
                </li>
  
              </ul>
  
            </div>
  
            {/* Contact */}
  
            <div>
  
              <h3 className="text-xl mb-6">
                Contact
              </h3>
  
              <div className="space-y-4 text-[#839958]">
  
                <p>Ahmedabad, Gujarat</p>
  
                <a
                  href="tel:+917016731747"
                  className="block hover:text-[#F7F4D5] transition"
                >
                  +91 70167 31747
                </a>
  
                <a
                  href="https://wa.me/917016731747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#F7F4D5] transition"
                >
                  WhatsApp
                </a>
  
              </div>
  
            </div>
  
            {/* Follow Us */}
  
            <div>
  
              <h3 className="text-xl mb-6">
                Follow Us
              </h3>
  
              <div className="flex flex-col gap-4 text-[#839958]">
  
                <a
                  href="https://www.instagram.com/theaumeragifts?igsh=NG5wa2NjanAzc2Rp&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F4D5] transition"
                >
                  Instagram
                </a>
  
                <a
                  href="https://www.facebook.com/share/1BWzBoavwt/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F4D5] transition"
                >
                  Facebook
                </a>
  
                <a
                  href="https://wa.me/917016731747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F4D5] transition"
                >
                  WhatsApp
                </a>
  
              </div>
  
            </div>
  
          </div>
  
          {/* Bottom Bar */}
  
          <div className="border-t border-[#839958] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
  
            <p className="text-[#839958] text-sm">
              © {new Date().getFullYear()} The Aumera Gifts. All Rights Reserved.
            </p>
  
            <div className="flex gap-6 text-sm text-[#839958]">
  
              <a href="#" className="hover:text-[#F7F4D5] transition">
                Privacy Policy
              </a>
  
              <a href="#" className="hover:text-[#F7F4D5] transition">
                Terms & Conditions
              </a>
  
              <a href="#" className="hover:text-[#F7F4D5] transition">
                Shipping Policy
              </a>
  
            </div>
  
          </div>
  
        </div>
  
      </footer>
    );
  }
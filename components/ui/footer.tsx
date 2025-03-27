"use client";

import Link from "next/link";

export default function Footer() {

  return (
    <footer className="py-6" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 flex flex-col space-y-8">
      <hr className="border-gray-300 dark:border-white" />
        {/* Navigation Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center sm:text-left ">
          {/* Logo Section */}
       
          <div className="flex justify-center">
            <a href="/" aria-label="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={90}
              height={90}
              viewBox="0 0 225 255"
              fill="none"
            >
              <path
                d="M97.181 101.035L72.6003 78.2705C71.1824 76.9582 71.1824 74.8299 72.6003 73.5175L141.203 9.9842C142.619 8.67186 144.917 8.67186 146.334 9.9842L214.936 73.5175C216.354 74.8299 216.354 76.9582 214.936 78.2705L146.334 141.804C144.917 143.116 142.619 143.116 141.203 141.804L124.486 126.323"
                className="stroke-[#205A8A] dark:stroke-white" 
                strokeWidth="16.6253"
                strokeMiterlimit={10}
              />
              <path
                d="M127.819 51.3162L152.4 74.0808C153.817 75.3931 153.817 77.5214 152.4 78.8337L83.7967 142.367C82.3803 143.679 80.0826 143.679 78.6663 142.367L10.0634 78.8337C8.64553 77.5214 8.64553 75.3931 10.0634 74.0808L78.6663 10.5474C80.0826 9.23509 82.3803 9.23509 83.7967 10.5474L100.514 26.028"
                className="stroke-[#382E7A] dark:stroke-white"
                strokeWidth="16.6253"
                strokeMiterlimit={10}
              />
              <path
                d="M45.016 207.144C50.268 215.493 55.4863 223.035 60.671 229.768L60.469 231.283C56.0923 232.832 51.6147 233.741 47.036 234.01L45.622 232.899C40.774 224.55 36.835 217.278 33.805 211.083H24.008V212.396L24.614 233H10.878L11.585 213.608L10.878 167.956L35.825 167.855C42.6257 167.855 47.8777 169.538 51.581 172.905C55.2843 176.204 57.136 180.951 57.136 187.146C57.136 191.321 56.0587 195.159 53.904 198.66C51.8167 202.094 48.854 204.922 45.016 207.144ZM24.21 200.478L34.209 200.882C39.9323 198.929 42.794 194.788 42.794 188.459C42.794 185.025 41.8513 182.466 39.966 180.783C38.148 179.032 35.32 178.09 31.482 177.955L24.614 178.359L24.21 200.478ZM91.3592 167.148C96.8806 167.148 102.368 168.259 107.822 170.481L105.6 182.298L103.58 183.106C101.291 181.49 98.9006 180.211 96.4092 179.268C93.9852 178.325 91.7632 177.854 89.7432 177.854C87.0499 177.854 84.8952 178.595 83.2792 180.076C81.6632 181.49 80.8552 183.14 80.8552 185.025C80.8552 186.978 81.7306 188.627 83.4812 189.974C85.2992 191.321 88.1272 192.903 91.9652 194.721C95.6686 196.404 98.6649 197.987 100.954 199.468C103.311 200.882 105.297 202.767 106.913 205.124C108.597 207.481 109.438 210.376 109.438 213.81C109.438 217.513 108.428 220.914 106.408 224.011C104.388 227.041 101.527 229.465 97.8232 231.283C94.1199 233.034 89.8442 233.909 84.9962 233.909C78.5996 233.909 72.1692 232.529 65.7052 229.768L67.6242 217.042L69.1392 216.234C71.8326 218.591 74.7616 220.409 77.9262 221.688C81.1582 222.9 84.0199 223.506 86.5112 223.506C89.4739 223.506 91.7632 222.799 93.3792 221.385C95.0626 219.904 95.9042 218.153 95.9042 216.133C95.9042 213.978 94.9952 212.228 93.1772 210.881C91.4266 209.534 88.5649 207.918 84.5922 206.033C80.9562 204.417 77.9936 202.902 75.7042 201.488C73.4149 200.074 71.4622 198.189 69.8462 195.832C68.2302 193.475 67.4222 190.614 67.4222 187.247C67.4222 183.476 68.4322 180.076 70.4522 177.046C72.4722 173.949 75.3002 171.525 78.9362 169.774C82.5722 168.023 86.7132 167.148 91.3592 167.148ZM161.66 221.688L162.468 222.799L161.559 233H120.755L121.462 213.608L120.755 167.956H161.963L162.771 169.067L161.761 179.268L146.207 178.763L134.491 178.864L134.188 194.519L145.399 194.721L156.004 194.418L156.812 195.428L155.903 205.629L144.389 205.326L133.986 205.427L133.885 212.396L134.188 222.193L145.601 222.294L161.66 221.688ZM206.483 199.266C210.927 200.343 214.192 202.161 216.28 204.72C218.434 207.211 219.512 210.511 219.512 214.618C219.512 227.209 209.647 233.505 189.919 233.505C184.128 233.505 178.203 233.337 172.143 233L172.85 213.608L172.143 167.956L195.272 167.855C201.938 167.855 207.122 169.269 210.826 172.097C214.529 174.858 216.381 178.864 216.381 184.116C216.381 187.617 215.505 190.681 213.755 193.307C212.071 195.933 209.647 197.919 206.483 199.266ZM202.342 185.934C202.342 182.971 201.466 180.884 199.716 179.672C197.965 178.393 194.901 177.753 190.525 177.753H185.576L185.273 195.428L194.767 195.731C197.325 195.058 199.211 193.947 200.423 192.398C201.702 190.849 202.342 188.695 202.342 185.934ZM192.242 223.708C196.484 223.708 199.749 222.866 202.039 221.183C204.395 219.5 205.574 217.076 205.574 213.911C205.574 209.13 202.476 206.168 196.282 205.023L185.071 205.225L184.97 212.396L185.273 223.304C187.629 223.573 189.952 223.708 192.242 223.708Z"
                className="stroke-[#382E7A] fill-[#382E7A] dark:stroke-white dark:fill-white" 

              />
            </svg>

            </a>
          </div>

          {/* Company Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1 dark:text-custom-1">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/company/profile" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/company/organogram" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Organogram
                </Link>
              </li>
              <li>
                <Link href="/company/timeline" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1 dark:text-custom-1">Resources</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/resources/debt" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Debt
                </Link>
              </li>
              <li>
                <Link href="/resources/finances" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Finances
                </Link>
              </li>
              <li>
                <Link href="/resources/equity" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Equity
                </Link>
              </li>
              <li>
                <Link href="/resources/indices" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Indices
                </Link>
              </li>
              <li>
                <Link href="/resources/downloads" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Charts & Metrics Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1 dark:text-custom-1">Charts & Metrics</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/bsi" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Bhutan Stock Index
                </Link>
              </li>
              <li>
                <Link href="/price-comparison" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Price Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* More Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1 dark:text-custom-1">More</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/more/contact" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/more/media" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/more/literacy" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  Literacy
                </Link>
              </li>
              <li>
                <Link href="/more/faqs" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 dark:border-white" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Copyright © 2025{" "}
            <a className="text-custom-1 dark:text-custom-1 hover:underline">
              Royal Securities Exchange of Bhutan
            </a>
            . All rights reserved.
          </p>
          <ul className="flex space-x-4 mt-4 sm:mt-0">
            <li>
              <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="https://rsebl.org.bt/agm/" className="text-gray-600 dark:text-gray-400 hover:text-custom-3">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
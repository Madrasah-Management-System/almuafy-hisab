# ALMUAFY HISAB

বাংলা-প্রথম, স্থানীয়ভাবে কাজ করা অফিস হিসাব অ্যাপের প্রাথমিক সংস্করণ। এই ফোল্ডারটি নতুন করে তৈরি করা হয়েছে।

## বর্তমান বাস্তবায়ন

- React + TypeScript + Vite ভিত্তিক responsive web interface
- IndexedDB-তে আয়/ব্যয়ের লেনদেন সংরক্ষণ, সার্চ, মুছে ফেলা এবং CSV রপ্তানি
- আয়, ব্যয়, ব্যালেন্স, লেনদেন সারাংশ এবং চার্ট
- বাংলা UI ও BDT প্রদর্শন

## এখনো অসম্পূর্ণ

এই সংস্করণটি সম্পূর্ণ production system নয়। গ্রাহক ও পাওনা-দেনা মডিউল, SQLite native adapter, OAuth consent configuration, নিরাপদ sync backend, Google Drive/Sheets integration, encryption/key management, conflict resolution, automated tests, Capacitor Android build এবং Windows installer এখনো তৈরি/যাচাই হয়নি। IndexedDB-র ডেটা browser profile-এর অংশ, তাই browser profile মুছে গেলে এটি নির্ভরযোগ্য ব্যাকআপ নয়। ক্লাউড ব্যাকআপ সংযুক্ত না হওয়া পর্যন্ত গুরুত্বপূর্ণ অফিস ডেটার একমাত্র কপি হিসেবে এটি ব্যবহার করবেন না।

## চালানো

Node.js 20+ ইনস্টল করে প্রকল্প ফোল্ডারে `npm install`, তারপর `npm run dev` চালান। Production build-এর জন্য `npm run build`।

## Google integration পরিকল্পনা

`.env.example`-এ শুধু public OAuth client ID রাখা যাবে। Client secret frontend-এ রাখা যাবে না। OAuth refresh token ও Google API access-এর জন্য যাচাইকৃত identity-সহ trusted backend প্রয়োজন। Google Drive-এ encrypted backup এবং Sheets-এ reporting projection যুক্ত করার আগে backend, access scope, encryption key recovery এবং restore integrity বাস্তবভাবে পরীক্ষা করতে হবে।

## ডেটা

বর্তমান browser সংস্করণ IndexedDB ব্যবহার করে। Native SQLite, schema migrations ও restore-safe backup format যোগ না হওয়া পর্যন্ত multi-device sync বা reinstall recovery উপলব্ধ নয়।

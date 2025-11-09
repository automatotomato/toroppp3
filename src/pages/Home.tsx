@@ .. @@
 import { ArrowRight, Star, Users, Award } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import Navigation from '../components/Navigation';
+import PricingSection from '../components/PricingSection';
 
 export default function Home() {
 }
@@ .. @@
         </div>
       </section>
 
+      <PricingSection />
+
       {/* CTA Section */}
       <section className="py-20 bg-blue-600">
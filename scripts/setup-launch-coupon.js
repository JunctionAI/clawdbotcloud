/**
 * Create LAUNCH30 coupon in Stripe for launch promotion
 * Run: node scripts/setup-launch-coupon.js
 */

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createLaunchCoupon() {
  console.log('🎟️ Creating LAUNCH30 coupon in Stripe...\n');

  try {
    // Check if coupon already exists
    try {
      const existing = await stripe.coupons.retrieve('LAUNCH30');
      console.log('⚠️ Coupon LAUNCH30 already exists:', existing);
      console.log('\n✅ Done - coupon is ready to use!');
      return existing;
    } catch (e) {
      // Coupon doesn't exist, create it
    }

    // Create the coupon
    const coupon = await stripe.coupons.create({
      id: 'LAUNCH30',
      percent_off: 30,
      duration: 'forever',
      max_redemptions: 50, // First 50 users only
      name: 'Launch Special - 30% Off Forever',
      metadata: {
        campaign: 'launch_night',
        created_by: 'setup_script',
        created_at: new Date().toISOString(),
      },
    });

    console.log('✅ Coupon created successfully!');
    console.log('\n📋 Coupon Details:');
    console.log(`   Code: ${coupon.id}`);
    console.log(`   Discount: ${coupon.percent_off}% off`);
    console.log(`   Duration: ${coupon.duration}`);
    console.log(`   Max Redemptions: ${coupon.max_redemptions}`);
    console.log('\n🎯 Customers can enter "LAUNCH30" at checkout for 30% off forever.');
    console.log('\n✅ Done!');

    return coupon;
  } catch (error) {
    console.error('❌ Error creating coupon:', error.message);
    throw error;
  }
}

// Also create a promotion code (links coupon to a shareable code)
async function createPromotionCode(couponId) {
  console.log('\n🔗 Creating promotion code...\n');

  try {
    const promoCode = await stripe.promotionCodes.create({
      coupon: couponId,
      code: 'LAUNCH30',
      max_redemptions: 50,
      metadata: {
        campaign: 'launch_night',
      },
    });

    console.log('✅ Promotion code created!');
    console.log(`   Code: ${promoCode.code}`);
    console.log(`   Active: ${promoCode.active}`);
    console.log(`   Times Redeemed: ${promoCode.times_redeemed}/${promoCode.max_redemptions}`);

    return promoCode;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('⚠️ Promotion code already exists');
    } else {
      console.error('❌ Error creating promotion code:', error.message);
    }
  }
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not set');
    console.log('\nUsage:');
    console.log('  $env:STRIPE_SECRET_KEY="sk_live_xxx"; node scripts/setup-launch-coupon.js');
    process.exit(1);
  }

  const coupon = await createLaunchCoupon();
  await createPromotionCode(coupon.id);
}

main().catch(console.error);

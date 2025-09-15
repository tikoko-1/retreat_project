import { NextRequest, NextResponse } from "next/server";
import { getSupabaseImageUrl } from "@/lib/utils";
import puppeteer from "puppeteer";
import { RetreatDetails } from "@/types";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { retreat: null, success: false, error: "Retreat ID is required" },
        { status: 400 }
      );
    }
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const response = await fetch(`${baseUrl}/api/venues/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch venue data");
    }

    const venue = await response.json();
    const htmlContent = generateBrochureHTML(venue);
    const pdfBuffer = await generatePDFFromHTML(htmlContent);

    const filename = `${
      venue.retreat?.title?.replace(/[^a-z0-9]/gi, "_") || "retreat"
    }-brochure.pdf`;

    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF brochure" },
      { status: 500 }
    );
  }
}

function generateBrochureHTML(venue: { retreat: RetreatDetails }): string {
  const {
    title,
    address,
    city,
    country,
    description,
    pricing,
    included_items,
    excluded_items,
    rooms,
    photos,
    amenities,
    owner,
    website_url,
    review_stats,
    hero_subline,
  } = venue.retreat;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title} - Retreat Brochure</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: #ffffff;
          font-size: 14px;
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: white;
        }
        
        /* Header Section */
        .header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        
        .title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111827;
          letter-spacing: -0.025em;
        }
        
        .subtitle {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 12px;
          font-weight: 400;
        }
        
        .location {
          font-size: 16px;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .location::before {
          content: '📍';
          font-size: 14px;
        }
        
        /* Hero Image */
        .hero-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          margin: 30px 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Section Styling */
        .section {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
          position: relative;
          padding-left: 20px;
        }
        
        .section-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 24px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        
        .description {
          font-size: 16px;
          line-height: 1.7;
          color: #374151;
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        
        /* Pricing Cards */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .pricing-item {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .pricing-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        
        .pricing-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .pricing-amount {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        
        .pricing-unit {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 12px;
        }
        
        .pricing-note {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.4;
          font-style: italic;
        }
        
        /* Items Grid */
        .items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 20px;
        }
        
        .items-section {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .items-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .included-title {
          color: #059669;
        }
        
        .excluded-title {
          color: #dc2626;
        }
        
        .items-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .items-list li {
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        
        .items-list li:last-child {
          border-bottom: none;
        }
        
        .check-icon {
          color: #059669;
          font-weight: bold;
          font-size: 16px;
        }
        
        .x-icon {
          color: #dc2626;
          font-weight: bold;
          font-size: 16px;
        }
        
        /* Rooms Grid */
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }
        
        .room-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .room-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #111827;
        }
        
        .room-details {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .room-details::before {
          content: '👥';
          font-size: 12px;
        }
        
        .room-description {
          font-size: 14px;
          color: #374151;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .room-price {
          font-size: 22px;
          font-weight: 600;
          color: #111827;
          background: #f0f9ff;
          padding: 8px 12px;
          border-radius: 6px;
          text-align: center;
        }
        
        /* Amenities Grid */
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        
        .amenity-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background: #ffffff;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .amenity-name {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 6px;
        }
        
        .amenity-group {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }
        
        /* Photo Gallery */
        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        
        .photo-item {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .photo-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
        }
        
        .photo-caption {
          padding: 12px;
          background: #f8fafc;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          font-weight: 500;
        }
        
        /* Contact Info */
        .contact-section {
          background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin: 40px 0;
        }
        
        .contact-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .contact-item {
          text-align: center;
        }
        
        .contact-label {
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .contact-value {
          font-size: 16px;
          font-weight: 500;
        }
        
        /* Reviews Section */
        .reviews-section {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin: 30px 0;
        }
        
        .review-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .rating-display {
          font-size: 48px;
          font-weight: 700;
          color: #f59e0b;
        }
        
        .rating-label {
          font-size: 14px;
          color: #6b7280;
        }
        
        /* Footer */
        .footer {
          margin-top: 50px;
          padding-top: 30px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .footer-logo {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }
        
        .footer-date {
          font-size: 12px;
          color: #9ca3af;
        }
        
        /* Print Styles */
        @media print {
          .container {
            padding: 15mm;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .pricing-grid,
          .rooms-grid,
          .amenities-grid {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1 class="title">${title}</h1>
          <div class="subtitle">${hero_subline}</div>
          <div class="location">${address}, ${city}, ${country}</div>
        </div>

        <!-- Hero Image -->
        ${
          photos && photos.length > 0
            ? `
          <img src="${getSupabaseImageUrl(photos[0].url)}" 
               alt="${photos[0].alt_text}" 
               class="hero-image" />
        `
            : ""
        }

        <!-- About Section -->
        ${
          description
            ? `
          <div class="section">
            <h2 class="section-title">About This Retreat</h2>
            <div class="description">${description}</div>
          </div>
        `
            : ""
        }

        <!-- Reviews Section -->
        ${
          review_stats
            ? `
          <div class="reviews-section">
            <div class="review-stats">
              <div class="rating-display">${
                review_stats.avg_rating?.toFixed(1) || "0.0"
              }</div>
              <div>
                <div class="rating-label">${
                  review_stats.review_count || 0
                } Reviews</div>
              </div>
            </div>
          </div>
        `
            : ""
        }

        <!-- Pricing Section -->
        ${
          pricing && pricing.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Pricing</h2>
            <div class="pricing-grid">
              ${pricing
                .map(
                  (price: any) => `
                <div class="pricing-item">
                  <div class="pricing-amount">${price.currency || "$"}${
                    price.amount ?? 0
                  }</div>
                  <div class="pricing-unit">${price.billing_unit ?? ""}</div>
                  ${
                    price.note
                      ? `<div class="pricing-note">${price.note}</div>`
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- What's Included -->
        ${
          (included_items && included_items.length > 0) ||
          (excluded_items && excluded_items.length > 0)
            ? `
          <div class="section">
            <h2 class="section-title">What's Included</h2>
            <div class="items-grid">
              ${
                included_items && included_items.length > 0
                  ? `
                <div class="items-section">
                  <h3 class="items-title included-title">
                    <span class="check-icon">✅</span>
                    Included
                  </h3>
                  <ul class="items-list">
                    ${included_items
                      .map(
                        (item: string) => `
                      <li>
                        <span class="check-icon">✅</span>
                        ${item}
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              `
                  : ""
              }
              
              ${
                excluded_items && excluded_items.length > 0
                  ? `
                <div class="items-section">
                  <h3 class="items-title excluded-title">
                    <span class="x-icon">❌</span>
                    Not Included
                  </h3>
                  <ul class="items-list">
                    ${excluded_items
                      .map(
                        (item: string) => `
                      <li>
                        <span class="x-icon">❌</span>
                        ${item}
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        `
            : ""
        }

        <!-- Accommodation -->
        ${
          rooms && rooms.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Accommodation Options</h2>
            <div class="rooms-grid">
              ${rooms
                .map(
                  (room: any) => `
                <div class="room-card">
                  <h3 class="room-name">${room.name}</h3>
                  <div class="room-details">
                    ${
                      room.capacity_min && room.capacity_max
                        ? `${room.capacity_min}-${room.capacity_max} guests`
                        : ""
                    }
                    ${room.size_sqft ? ` • ${room.size_sqft} sqm` : ""}
                  </div>
                  ${
                    room.description
                      ? `<div class="room-description">${room.description}</div>`
                      : ""
                  }
                  ${
                    room.price_min && room.price_max
                      ? `
                    <div class="room-price">${room.currency || "$"} ${
                          room.price_min
                        } - ${room.price_max}</div>
                  `
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Amenities -->
        ${
          amenities && amenities.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Amenities & Facilities</h2>
            <div class="amenities-grid">
              ${amenities
                .map(
                  (amenity: any) => `
                <div class="amenity-item">
                  <div class="amenity-name">${amenity.name}</div>
                  ${
                    amenity.group
                      ? `<div class="amenity-group">${amenity.description}</div>`
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Photo Gallery -->
        ${
          photos
            ? `
          <div class="section">
            <h2 class="section-title">Photo Gallery</h2>
            <div class="photos-grid">
              ${photos
                .map(
                  (photo: any) => `
                <div class="photo-item">
                  <img src="${getSupabaseImageUrl(photo.url || photo)}" 
                       alt="${photo.alt_text || "Retreat photo"}" 
                       class="photo-image" />
                  ${
                    photo.alt_text
                      ? `<div class="photo-caption">${photo.alt_text}</div>`
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Contact Information -->
        <div class="contact-section">
          <h3 class="contact-title">Get In Touch</h3>
          <div class="contact-grid">
            ${
              owner
                ? `
              <div class="contact-item">
                <div class="contact-label">Name</div>
                <div class="contact-value">${owner.name}</div>
              </div>
            `
                : ""
            }
            ${
              owner?.email
                ? `
              <div class="contact-item">
                <div class="contact-label">Email</div>
                <div class="contact-value">${owner.email}</div>
              </div>
            `
                : ""
            }
            ${
              owner?.phone
                ? `
              <div class="contact-item">
                <div class="contact-label">Phone</div>
                <div class="contact-value">${owner.phone}</div>
              </div>
            `
                : ""
            }
            ${
              website_url
                ? `
              <div class="contact-item">
                <div class="contact-label">Website</div>
                <div class="contact-value">${website_url}</div>
              </div>
            `
                : ""
            }
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-content">
            <div class="footer-logo">${title}</div>
            <div class="footer-date">Generated on ${new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}</div>
          </div>
          <p>For more information and bookings, please contact us directly or visit our website.</p>
        </div>
      </div>
    </body>
    </html>
    `;
}

async function generatePDFFromHTML(html: string): Promise<Buffer> {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    // Fallback to HTML if PDF generation fails
    return Buffer.from(html, "utf-8");
  }
}

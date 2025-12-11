-- =====================================================
-- KUWEX STUDIOS - DEMO DATA FOR SUPABASE
-- Run this SQL in your Supabase SQL Editor to populate
-- the dashboard with demonstration data
-- =====================================================

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM tasks;
-- DELETE FROM invoices;
-- DELETE FROM quotations;
-- DELETE FROM tenders;
-- DELETE FROM projects;
-- DELETE FROM leads;
-- DELETE FROM clients;
-- DELETE FROM team_members;

-- =====================================================
-- CLIENTS
-- =====================================================
INSERT INTO clients (name, email, phone, company, total_spent, projects_count, status, joined_date) VALUES
('John Moyo', 'john@techstart.co.zw', '+263 77 123 4567', 'TechStart Inc', 12500, 3, 'active', '2024-01-15'),
('Sarah Ndlovu', 'sarah@greenenergy.co.zw', '+263 77 234 5678', 'GreenEnergy Ltd', 8500, 2, 'active', '2024-02-20'),
('Mike Chikwanha', 'mike@healthplus.co.zw', '+263 77 345 6789', 'HealthPlus Medical', 15000, 4, 'active', '2024-03-10'),
('Grace Mutasa', 'grace@safebank.co.zw', '+263 77 456 7890', 'SafeBank Financial', 22000, 5, 'active', '2023-11-05'),
('Peter Zimuto', 'peter@edulearn.co.zw', '+263 77 567 8901', 'EduLearn Academy', 6500, 2, 'active', '2024-04-18'),
('Linda Maposa', 'linda@freshfarms.co.zw', '+263 77 678 9012', 'Fresh Farms Produce', 4200, 1, 'inactive', '2024-05-22'),
('David Chirwa', 'david@buildright.co.zw', '+263 77 789 0123', 'BuildRight Construction', 18500, 3, 'active', '2024-01-30'),
('Tendai Mhaka', 'tendai@sunrisehold.co.zw', '+263 77 890 1234', 'Sunrise Holdings', 9800, 2, 'active', '2024-06-12');

-- =====================================================
-- LEADS
-- =====================================================
INSERT INTO leads (name, email, phone, company, service, status, value, source, notes) VALUES
('Robert Banda', 'robert@newventure.co.zw', '+263 77 111 2222', 'New Venture Tech', 'Web Development', 'new', 5500, 'Website', 'Interested in e-commerce website'),
('Mary Sibanda', 'mary@luxuryhotels.co.zw', '+263 77 222 3333', 'Luxury Hotels Group', 'Branding & Design', 'contacted', 8000, 'Referral', 'Needs complete brand refresh'),
('James Phiri', 'james@autoparts.co.zw', '+263 77 333 4444', 'AutoParts Zimbabwe', 'Digital Marketing', 'qualified', 3500, 'LinkedIn', 'Looking for social media management'),
('Susan Dube', 'susan@fashionhub.co.zw', '+263 77 444 5555', 'Fashion Hub Boutique', 'Web Development', 'proposal', 4200, 'WhatsApp', 'Online store with payment integration'),
('Thomas Ncube', 'thomas@logisticspro.co.zw', '+263 77 555 6666', 'Logistics Pro', 'Mobile Apps', 'new', 12000, 'Website', 'Fleet management mobile app'),
('Patricia Moyo', 'patricia@beautycare.co.zw', '+263 77 666 7777', 'Beauty Care Salon', 'Web Development', 'new', 2800, 'Instagram', 'Booking website needed'),
('Charles Mpofu', 'charles@realestate.co.zw', '+263 77 777 8888', 'Prime Real Estate', 'Web Development', 'contacted', 7500, 'Referral', 'Property listing website'),
('Nancy Chigumba', 'nancy@fooddelivery.co.zw', '+263 77 888 9999', 'Quick Eats Delivery', 'Mobile Apps', 'qualified', 15000, 'Website', 'Food delivery app development');

-- =====================================================
-- PROJECTS
-- =====================================================
INSERT INTO projects (name, client, status, progress, value, start_date, deadline, category, team) VALUES
('TechStart Website Redesign', 'TechStart Inc', 'in_progress', 75, 4500, '2024-10-01', '2024-12-20', 'Web Development', ARRAY['Kuda', 'Designer']),
('GreenEnergy Brand Identity', 'GreenEnergy Ltd', 'in_progress', 45, 3200, '2024-10-15', '2024-12-25', 'Branding & Design', ARRAY['Designer', 'Kuda']),
('HealthPlus Mobile App', 'HealthPlus Medical', 'review', 90, 8500, '2024-08-01', '2024-12-18', 'Mobile Apps', ARRAY['Kuda', 'Developer']),
('SafeBank Security Portal', 'SafeBank Financial', 'in_progress', 60, 12000, '2024-09-15', '2025-01-15', 'Web Development', ARRAY['Kuda', 'Security Expert']),
('EduLearn Marketing Campaign', 'EduLearn Academy', 'in_progress', 30, 2500, '2024-11-01', '2024-12-30', 'Digital Marketing', ARRAY['Marketing', 'Kuda']),
('BuildRight Company Website', 'BuildRight Construction', 'completed', 100, 5500, '2024-06-01', '2024-09-30', 'Web Development', ARRAY['Kuda', 'Designer']),
('Sunrise Holdings Dashboard', 'Sunrise Holdings', 'planning', 10, 6800, '2024-12-01', '2025-02-28', 'Web Development', ARRAY['Kuda']),
('Fresh Farms E-commerce', 'Fresh Farms Produce', 'completed', 100, 4200, '2024-04-01', '2024-07-31', 'Web Development', ARRAY['Kuda', 'Developer']);

-- =====================================================
-- QUOTATIONS
-- =====================================================
INSERT INTO quotations (quote_number, client_id, client_name, project_name, amount, status, valid_until, items) VALUES
('QT-2024-001', (SELECT id FROM clients WHERE email = 'john@techstart.co.zw'), 'TechStart Inc', 'E-commerce Platform Upgrade', 6500, 'sent', '2024-12-31', '[{"description": "E-commerce Development", "quantity": 1, "unit_price": 5000, "total": 5000}, {"description": "Payment Integration", "quantity": 1, "unit_price": 1500, "total": 1500}]'::jsonb),
('QT-2024-002', (SELECT id FROM clients WHERE email = 'sarah@greenenergy.co.zw'), 'GreenEnergy Ltd', 'Solar Calculator App', 4800, 'draft', '2025-01-15', '[{"description": "Mobile App Development", "quantity": 1, "unit_price": 4000, "total": 4000}, {"description": "API Integration", "quantity": 1, "unit_price": 800, "total": 800}]'::jsonb),
('QT-2024-003', (SELECT id FROM clients WHERE email = 'mike@healthplus.co.zw'), 'HealthPlus Medical', 'Patient Portal Phase 2', 9500, 'accepted', '2024-12-20', '[{"description": "Portal Development", "quantity": 1, "unit_price": 7500, "total": 7500}, {"description": "Training & Support", "quantity": 1, "unit_price": 2000, "total": 2000}]'::jsonb),
('QT-2024-004', (SELECT id FROM clients WHERE email = 'grace@safebank.co.zw'), 'SafeBank Financial', 'Mobile Banking App', 18000, 'sent', '2025-01-31', '[{"description": "App Development", "quantity": 1, "unit_price": 15000, "total": 15000}, {"description": "Security Audit", "quantity": 1, "unit_price": 3000, "total": 3000}]'::jsonb),
('QT-2024-005', (SELECT id FROM clients WHERE email = 'peter@edulearn.co.zw'), 'EduLearn Academy', 'LMS Platform', 7200, 'expired', '2024-11-30', '[{"description": "LMS Development", "quantity": 1, "unit_price": 6000, "total": 6000}, {"description": "Content Migration", "quantity": 1, "unit_price": 1200, "total": 1200}]'::jsonb);

-- =====================================================
-- INVOICES
-- =====================================================
INSERT INTO invoices (invoice_number, client_id, client_name, project_name, amount, paid_amount, status, due_date, items) VALUES
('INV-2024-001', (SELECT id FROM clients WHERE email = 'john@techstart.co.zw'), 'TechStart Inc', 'Website Redesign - Phase 1', 2500, 2500, 'paid', '2024-11-15', '[{"description": "Website Design", "quantity": 1, "unit_price": 1500, "total": 1500}, {"description": "Development", "quantity": 1, "unit_price": 1000, "total": 1000}]'::jsonb),
('INV-2024-002', (SELECT id FROM clients WHERE email = 'sarah@greenenergy.co.zw'), 'GreenEnergy Ltd', 'Brand Identity Package', 3200, 1600, 'partial', '2024-12-20', '[{"description": "Logo Design", "quantity": 1, "unit_price": 1200, "total": 1200}, {"description": "Brand Guidelines", "quantity": 1, "unit_price": 2000, "total": 2000}]'::jsonb),
('INV-2024-003', (SELECT id FROM clients WHERE email = 'mike@healthplus.co.zw'), 'HealthPlus Medical', 'Mobile App - Milestone 1', 4250, 4250, 'paid', '2024-10-30', '[{"description": "App Development Phase 1", "quantity": 1, "unit_price": 4250, "total": 4250}]'::jsonb),
('INV-2024-004', (SELECT id FROM clients WHERE email = 'mike@healthplus.co.zw'), 'HealthPlus Medical', 'Mobile App - Milestone 2', 4250, 0, 'sent', '2024-12-25', '[{"description": "App Development Phase 2", "quantity": 1, "unit_price": 4250, "total": 4250}]'::jsonb),
('INV-2024-005', (SELECT id FROM clients WHERE email = 'grace@safebank.co.zw'), 'SafeBank Financial', 'Security Portal - Deposit', 6000, 6000, 'paid', '2024-09-30', '[{"description": "Project Deposit (50%)", "quantity": 1, "unit_price": 6000, "total": 6000}]'::jsonb),
('INV-2024-006', (SELECT id FROM clients WHERE email = 'peter@edulearn.co.zw'), 'EduLearn Academy', 'Marketing Campaign Setup', 1200, 0, 'overdue', '2024-11-30', '[{"description": "Campaign Setup", "quantity": 1, "unit_price": 800, "total": 800}, {"description": "Ad Creative", "quantity": 1, "unit_price": 400, "total": 400}]'::jsonb),
('INV-2024-007', (SELECT id FROM clients WHERE email = 'linda@freshfarms.co.zw'), 'Fresh Farms Produce', 'E-commerce Website', 4200, 4200, 'paid', '2024-08-15', '[{"description": "E-commerce Development", "quantity": 1, "unit_price": 4200, "total": 4200}]'::jsonb),
('INV-2024-008', (SELECT id FROM clients WHERE email = 'david@buildright.co.zw'), 'BuildRight Construction', 'Company Website', 5500, 5500, 'paid', '2024-10-15', '[{"description": "Website Development", "quantity": 1, "unit_price": 5500, "total": 5500}]'::jsonb);

-- =====================================================
-- TENDERS
-- =====================================================
INSERT INTO tenders (title, organization, value, deadline, status, category, requirements, submission_date) VALUES
('Government Portal Development', 'Ministry of ICT', 85000, '2025-01-31', 'planning', 'Web Development', ARRAY['Company Registration', 'Tax Clearance', 'Portfolio'], '2024-12-15'),
('University LMS Platform', 'Zimbabwe Open University', 45000, '2025-02-15', 'submitted', 'Web Development', ARRAY['Education Sector Experience', 'Technical Proposal'], '2024-12-10'),
('Hospital Management System', 'Parirenyatwa Hospital', 120000, '2025-03-01', 'identified', 'Software Development', ARRAY['Healthcare Experience', 'Security Certification'], NULL),
('Tourism Board Website', 'Zimbabwe Tourism Authority', 35000, '2024-12-20', 'won', 'Web Development', ARRAY['Tourism Portfolio', 'Multilingual Support'], '2024-11-20'),
('Banking App Development', 'Reserve Bank of Zimbabwe', 200000, '2025-04-30', 'submitted', 'Mobile Apps', ARRAY['Financial Sector Experience', 'Security Audit'], '2024-12-01');

-- =====================================================
-- VERIFY DATA
-- =====================================================
SELECT 'Clients' as table_name, COUNT(*) as count FROM clients
UNION ALL
SELECT 'Leads', COUNT(*) FROM leads
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects
UNION ALL
SELECT 'Quotations', COUNT(*) FROM quotations
UNION ALL
SELECT 'Invoices', COUNT(*) FROM invoices
UNION ALL
SELECT 'Tenders', COUNT(*) FROM tenders;

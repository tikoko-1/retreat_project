-- ===========================
-- STORAGE BUCKETS
-- ===========================
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true),
  ('amenities', 'amenities', true),
  ('blog_covers', 'blog_covers', true),
  ('guide_covers', 'guide_covers', true),
  ('venue_photos', 'venue_photos', true) on conflict (id) do nothing;
-- ===========================
-- RLS POLICIES FOR STORAGE
-- ===========================
-- Avatars: users manage their own
drop policy if exists "Users can upload avatar" on storage.objects;
create policy "Users can upload avatar" on storage.objects for
insert to authenticated with check (
    bucket_id = 'avatars'
    and (storage.foldername(name)) [1] = auth.uid()::text
  );
drop policy if exists "Users can update/delete own avatar" on storage.objects;
create policy "Users can update/delete own avatar" on storage.objects for all to authenticated using (
  bucket_id = 'avatars'
  and (storage.foldername(name)) [1] = auth.uid()::text
);
drop policy if exists "Public can view avatars" on storage.objects;
create policy "Public can view avatars" on storage.objects for
select to public using (bucket_id = 'avatars');
-- Amenities: only admin can upload/update
drop policy if exists "Admins manage amenities icons" on storage.objects;
create policy "Admins manage amenities icons" on storage.objects for all to authenticated using (
  bucket_id = 'amenities'
  and auth.role() = 'admin'
) with check (
  bucket_id = 'amenities'
  and auth.role() = 'admin'
);
drop policy if exists "Public can view amenities icons" on storage.objects;
create policy "Public can view amenities icons" on storage.objects for
select to public using (bucket_id = 'amenities');
-- Blog covers: only admin/hosts
drop policy if exists "Admins manage blog covers" on storage.objects;
create policy "Admins manage blog covers" on storage.objects for all to authenticated using (
  bucket_id = 'blog_covers'
  and auth.role() = 'admin'
) with check (
  bucket_id = 'blog_covers'
  and auth.role() = 'admin'
);
drop policy if exists "Public can view blog covers" on storage.objects;
create policy "Public can view blog covers" on storage.objects for
select to public using (bucket_id = 'blog_covers');
-- Guide covers: only admin
drop policy if exists "Admins manage guide covers" on storage.objects;
create policy "Admins manage guide covers" on storage.objects for all to authenticated using (
  bucket_id = 'guide_covers'
  and auth.role() = 'admin'
) with check (
  bucket_id = 'guide_covers'
  and auth.role() = 'admin'
);
drop policy if exists "Public can view guide covers" on storage.objects;
create policy "Public can view guide covers" on storage.objects for
select to public using (bucket_id = 'guide_covers');
-- Venue photos: host manages their own
drop policy if exists "Hosts manage own venue photos" on storage.objects;
create policy "Hosts manage own venue photos" on storage.objects for all to authenticated using (
  bucket_id = 'venue_photos'
  and (storage.foldername(name)) [1] = auth.uid()::text
) with check (
  bucket_id = 'venue_photos'
  and (storage.foldername(name)) [1] = auth.uid()::text
);
drop policy if exists "Public can view venue photos" on storage.objects;
create policy "Public can view venue photos" on storage.objects for
select to public using (bucket_id = 'venue_photos');
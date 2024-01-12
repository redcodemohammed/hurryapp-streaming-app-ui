<script lang="ts" setup>
const { logout } = useAuth();
const router = useRouter();

logout();
router.push("/login");
</script>

<script>
const auditStatus = {
  pass: {
    type: "success",
    text: "已通过",
  },
  reject: {
    type: "danger",
    text: "已拒绝",
  },
  pending: {
    type: "info",
    text: "未审核",
  },
};
export default {
  name: "Status",
  props: ["status"],
  render(h) {
    const { status = "pending" } = this;
    const { type, text } = auditStatus[status];
    return h("el-tag", { props: { type } }, text);
  },
};
</script>
